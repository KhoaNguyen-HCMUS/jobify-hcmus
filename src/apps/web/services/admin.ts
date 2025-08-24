const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { getToken } from "../utils/auth";

export interface PendingCompany {
  id: string;
  user_id: string;
  company_name: string;
  website: string;
  tax_code: string;
  license_number: string;
  phone_number: string;
  description: string;
  address: string;
  industry: string;
  size: string;
  logo_id: string | null;
  founded_year: number;
  status: string;
  created_at: string;
  updated_at: string;
  cover_id: string | null;
  moderator_notes: string | null;
}

export interface PendingJob {
  id: string;
  company_id: string;
  created_by: string;
  title: string;
  province: string;
  ward: string;
  work_place: string;
  salary_min: string;
  salary_max: string;
  is_salary_negotiable: boolean;
  experience_level: string;
  position: string;
  education_level: string;
  job_type: string;
  number_of_openings: number;
  deadline: string;
  working_hours: string;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  industry_id: string;
  currency: string;
  status: string;
  cost_coin: number;
  applications_count: number;
  moderator_notes: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
  skills: string;
  prev_status: string | null;
}

export interface PendingCompaniesResponse {
  success: boolean;
  message: string;
  data: PendingCompany[];
}

export interface PendingJobsResponse {
  success: boolean;
  message: string;
  data: PendingJob[];
}

export const getPendingCompanies = async (): Promise<PendingCompaniesResponse> => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/companies/pending`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching pending companies:', error);
    return {
      success: false,
      message: 'Failed to fetch pending companies',
      data: [],
    };
  }
};

export const getPendingJobs = async (): Promise<PendingJobsResponse> => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/jobs/pending`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching pending jobs:', error);
    return {
      success: false,
      message: 'Failed to fetch pending jobs',
      data: [],
    };
  }
};

export const approveCompany = async (companyId: string): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/companies/${companyId}/approve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error approving company:', error);
    return {
      success: false,
      message: 'Failed to approve company',
    };
  }
};

export const approveJob = async (jobId: string): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/jobs/${jobId}/approve`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error approving job:', error);
    return {
      success: false,
      message: 'Failed to approve job',
    };
  }
};

export const rejectCompany = async (companyId: string, moderator_notes: string): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/companies/${companyId}/reject`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ moderator_notes }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error rejecting company:', error);
    return {
      success: false,
      message: 'Failed to reject company',
    };
  }
};

export const rejectJob = async (jobId: string, moderator_notes: string): Promise<{ success: boolean; message: string }> => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/jobs/${jobId}/reject`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ moderator_notes }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error rejecting job:', error);
    return {
      success: false,
      message: 'Failed to reject job',
    };
  }
};
