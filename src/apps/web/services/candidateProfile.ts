import { getToken } from '../utils/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Experience {
  id: string;
  user_profile_id: string;
  company_name: string;
  job_title: string;
  description: string;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  location: string;
  created_at: string;
  updated_at: string;
}

export interface Education {
  id: string;
  user_profile_id: string;
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string | null;
  end_date: string | null;
  grade: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  gender: string;
  date_of_birth: string;
  phone: string;
  profile_photo_id: string | null;
  profile_photo_url: string | null;
  bio: string;
  province: string;
  ward: string;
  address_detail: string;
  industry: string;
  website: string;
  linkedin_url: string;
  github_url: string;
  created_at: string;
  updated_at: string;
  skills: string;
  experiences: Experience[];
  educations: Education[];
  email: string;
}

export interface ProfileResponse {
  success: boolean;
  message: string;
  data?: {
    profile: Profile;
  };
}

export interface UpdateProfileData {
  full_name?: string;
  gender?: string;
  date_of_birth?: string;
  phone?: string;
  bio?: string;
  province?: string;
  ward?: string;
  address_detail?: string;
  industry?: string;
  github_url?: string;
  linkedin_url?: string;
  website?: string;
  skills?: string;
  experiences?: {
    company_name?: string;
    job_title?: string;
    description?: string;
    location?: string;
    start_date?: string;
    end_date?: string;
    is_current?: boolean;
  }[];
  educations?: {
    institution?: string;
    degree?: string;
    field_of_study?: string;
    grade?: string;
    description?: string;
    start_date?: string;
    end_date?: string;
  }[];
}

export const getProfile = async (): Promise<ProfileResponse> => {
  try {
    const token = getToken();

    if (!token) {
      return {
        success: false,
        message: 'No authentication token found',
      };
    }

    const response = await fetch(`${API_URL}/profile/candidate/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch profile data',
    };
  }
};

export const updateProfile = async (updateData: UpdateProfileData): Promise<ProfileResponse> => {
  try {
    const token = getToken();

    if (!token) {
      return {
        success: false,
        message: 'No authentication token found',
      };
    }


    const response = await fetch(`${API_URL}/profile/candidate/me`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update profile',
    };
  }
};

export const getCandidateProfileById = async (candidateId: string): Promise<ProfileResponse> => {
  try {
    const token = getToken();

    if (!token) {
      return {
        success: false,
        message: 'No authentication token found',
      };
    }

    const response = await fetch(`${API_URL}/profile/candidate/${candidateId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch candidate profile',
    };
  }
}; 