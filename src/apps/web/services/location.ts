const API_URL = 'https://provinces.open-api.vn/api/v1';

export interface Province {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: District[];
}

export interface District {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
  wards: any[];
}

export interface ProvinceResponse {
  success: boolean;
  message: string;
  data?: Province[];
}

export interface DistrictResponse {
  success: boolean;
  message: string;
  data?: District[];
}

export const getProvinces = async (): Promise<ProvinceResponse> => {
  try {
    const response = await fetch(`${API_URL}/p/`);
    const data = await response.json();
    
    return {
      success: true,
      message: 'Provinces fetched successfully',
      data: data
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch provinces'
    };
  }
};

export const getDistrictsByProvince = async (provinceCode: number): Promise<DistrictResponse> => {
  try {
    const response = await fetch(`${API_URL}/p/${provinceCode}?depth=2`);
    const data = await response.json();
    
    return {
      success: true,
      message: 'Districts fetched successfully',
      data: data.districts || []
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch districts'
    };
  }
}; 