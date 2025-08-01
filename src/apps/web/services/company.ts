import { getToken } from '../utils/auth';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface CompanyProfile {
  id: string;
  user_id: string;
  company_name: string;
  website: string | null;
  tax_code: string;
  license_number: string;
  phone_number: string | null;
  email: string | null;
  description: string | null;
  address: string | null;
  industry: string | null;
  size: string | null;
  logo_url: string | null;
  cover_url: string | null;
  founded_year: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CompanyProfileResponse {
  success: boolean;
  message: string;
  data?: {
    companyProfiles: CompanyProfile;
  };
}

export const getCompanyProfile = async (): Promise<CompanyProfileResponse> => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/profile/company/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Network connection error',
    };
  }
}; 