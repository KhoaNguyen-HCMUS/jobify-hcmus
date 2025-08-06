import { getToken } from "../utils/auth";
import { Profile } from "./candidateProfile";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
}

export interface ApplicationStatusHistory {
  id: string;
  application_id: string;
  old_status: string;
  new_status: string;
  changed_by: string;
  notes: string | null;
  created_at: string;
}

export interface ApplicationsResponse {
  success: boolean;
  message: string;
  data?: Application[];
}



export interface ApplicationDetail {
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

export const getApplicationsByJob = async (jobId: string): Promise<ApplicationsResponse> => {
  try {
    const token = getToken();
    if (!token) {
      return {
        success: false,
        message: 'Authentication required',
      };
    }

    const response = await fetch(`${API_URL}/jobs/${jobId}/applications`, {
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