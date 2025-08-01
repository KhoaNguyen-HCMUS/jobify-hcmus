const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Job {
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
}

export interface JobsResponse {
  success: boolean;
  message: string;
  data?: Job[];
}

export interface JobResponse {
  success: boolean;
  message: string;
  data?: Job;
}

export const getAllJobs = async (): Promise<JobsResponse> => {
  try {
    const response = await fetch(`${API_URL}/jobs`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

export const getJobById = async (id: string): Promise<JobResponse> => {
  try {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

export const postNewJob = async (data: any, token: string): Promise<JobResponse> => {
  try {
    const response = await fetch(`${API_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
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