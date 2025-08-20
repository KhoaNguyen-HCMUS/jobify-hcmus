/**
 * Address utilities for parsing and mapping company addresses
 */

export interface Province {
  code: number;
  name: string;
}

export interface District {
  code: number;
  name: string;
  province_code: number;
}

/**
 * Parse company address to extract province and district
 * Returns { province: string, district: string } or null if not found
 */
export const parseAddressToLocation = (
  address: string,
  provinces: Province[],
  districts: District[]
): { province: string; district: string } | null => {
  if (!address) return null;

  const addressLower = address.toLowerCase();
  
  // Try to find province first
  let foundProvince: Province | null = null;
  
  for (const province of provinces) {
    const provinceNameLower = province.name.toLowerCase();
    
    // Check if province name appears in address
    if (addressLower.includes(provinceNameLower)) {
      foundProvince = province;
      break;
    }
  }
  
  if (!foundProvince) return null;
  
  // Try to find district within the found province
  const provinceDistricts = districts.filter(d => d.province_code === foundProvince!.code);
  let foundDistrict: District | null = null;
  
  for (const district of provinceDistricts) {
    const districtNameLower = district.name.toLowerCase();
    
    // Check if district name appears in address
    if (addressLower.includes(districtNameLower)) {
      foundDistrict = district;
      break;
    }
  }
  
  return {
    province: foundProvince.name,
    district: foundDistrict?.name || ""
  };
};

/**
 * Check if an address contains location information
 */
export const hasLocationInfo = (address: string): boolean => {
  if (!address) return false;
  
  const addressLower = address.toLowerCase();
  
  // Common location indicators
  const locationIndicators = [
    'district', 'quận', 'ward', 'phường', 'street', 'đường', 'road', 'đường',
    'province', 'tỉnh', 'city', 'thành phố', 'tp', 'tp.', 'q', 'q.'
  ];
  
  return locationIndicators.some(indicator => addressLower.includes(indicator));
};
