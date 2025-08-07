import { getToken } from "../utils/auth";
import { Profile } from "./candidateProfile";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ApplicationStatusHistory {
  id: string;
  application_id: string;
  old_status: string;
  new_status: string;
  changed_by: string;
  notes: string | null;
  created_at: string;
}

export interface UserProfile {
  full_name: string;
  province: string;
  ward: string;
  industry: string;
}

export interface Application {
  id: string;
  job_id: string;
  candidate_id: string;
  resume_file_id: string;
  cover_letter: string;
  status: string;
  notes: string | null;
  applied_at: string;
  updated_at: string;
  application_status_history: ApplicationStatusHistory[];
  user_profile: UserProfile;
  resume_url: string;
}

export interface ApplicationsResponse {
  success: boolean;
  message: string;
  data?: Application[];
}

export interface ApplicationDetail {
  id: string;
  job_id: string;
  candidate_id: string;
  notes: string | null;
  applied_at: string;
  updated_at: string;
  user_profile: Profile;
  resume_url: string;
  cover_letter: string;
  status: string;
  application_status_history: ApplicationStatusHistory[];
}

export interface ApplicationDetailResponse {
  success: boolean;
  message: string;
  data?: ApplicationDetail;
}

export interface UpdateApplicationStatusRequest {
  newStatus: string;
  notes?: string;
}

export interface UpdateApplicationStatusResponse {
  success: boolean;
  message: string;
  data: any;
}

export const getApplicationsByJob = async (jobId: string): Promise<ApplicationsResponse> => {
  try {
    const token = getToken();
    if (!token) {
      return {
        success: false,
        message: 'Authentication required',
      };
    }

    const response = await fetch(`${API_URL}/company/jobs/${jobId}/applications`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Network connection error',
    };
  }
};

export const getApplicationByCandidate = async (jobId: string): Promise<ApplicationsResponse> => {
  try {
    const token = getToken();
    if (!token) {
      return {
        success: false,
        message: 'Authentication required',
      };
    }

    const response = await fetch(`${API_URL}/jobs/${jobId}/applications/candidate`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Network connection error',
    };
  }
};

export const getApplicationById = async (applicationId: string): Promise<ApplicationDetailResponse> => {
  try {
    const token = getToken();
    if (!token) {
      return {
        success: false,
        message: 'Authentication required',
      };
    }

    const response = await fetch(`${API_URL}/applications/${applicationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Network connection error',
    };
  }
};

export const updateApplicationStatus = async (
  applicationId: string,
  payload: UpdateApplicationStatusRequest,
): Promise<UpdateApplicationStatusResponse> => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/applications/${applicationId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Network connection error',
      data: null,
    };
  }
}; 

export interface CancelApplicationResponse {
  success: boolean;
  message: string;
  data?: null;
}

export const cancelApplication = async (jobId: string): Promise<CancelApplicationResponse> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/jobs/${jobId}/apply`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error canceling application:', error);
    throw error;
  }
}; 