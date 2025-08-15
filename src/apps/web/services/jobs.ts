import { getToken } from "../utils/auth";
import { CompanyProfile } from "./companyProfile";
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
  company_name?: string;
}

export interface AppliedJob {
  id: string;
  application_id: string;
  status: string;
  job_id: string;
  title: string;
  province: string;
  ward: string;
  salary_min: string;
  salary_max: string;
  is_salary_negotiable: boolean;
  company_name: string;
  currency: string;
}

export interface AppliedJobsResponse {
  success: boolean;
  message: string;
  data?: AppliedJob[];
}

export interface JobDetailData {
  company: CompanyProfile;
  job: Job;
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

export interface JobDetailResponse {
  success: boolean;
  message: string;
  data?: JobDetailData;
}

export interface SaveJobResponse {
  success: boolean;
  message: string;
  data?: {
    saved: boolean;
  };
}

export const getAllJobs = async (): Promise<JobsResponse> => {
  try {
    const response = await fetch(`${API_URL}/jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network connection error",
    };
  }
};

export const getJobById = async (id: string): Promise<JobDetailResponse> => {
  try {
    const response = await fetch(`${API_URL}/jobs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network connection error",
    };
  }
};

export const getJobsByCompany = async (): Promise<JobsResponse> => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/company/jobs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network connection error",
    };
  }
};

export const getSavedJobs = async (): Promise<JobsResponse> => {
  try {
    const token = getToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const response = await fetch(`${API_URL}/jobs/saved`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network connection error",
    };
  }
};

export const saveJob = async (jobId: string): Promise<SaveJobResponse> => {
  try {
    const token = getToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const response = await fetch(`${API_URL}/jobs/${jobId}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network connection error",
    };
  }
};

export const unsaveJob = async (jobId: string): Promise<SaveJobResponse> => {
  try {
    const token = getToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const response = await fetch(`${API_URL}/jobs/${jobId}/save`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network connection error",
    };
  }
};

export const toggleSaveJob = async (
  jobId: string,
  isCurrentlySaved: boolean
): Promise<SaveJobResponse> => {
  if (isCurrentlySaved) {
    return await unsaveJob(jobId);
  } else {
    return await saveJob(jobId);
  }
};

export const postNewJob = async (
  data: any,
  token: string
): Promise<JobResponse> => {
  try {
    const response = await fetch(`${API_URL}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network connection error",
    };
  }
};

export const updateJob = async (
  jobId: string,
  data: any,
  token: string
): Promise<JobResponse> => {
  try {
    const response = await fetch(`${API_URL}/jobs/${jobId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network connection error",
    };
  }
};

export const closeJob = async (
  jobId: string,
  token: string
): Promise<JobResponse> => {
  try {
    const response = await fetch(`${API_URL}/jobs/${jobId}/close`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        status: "expired",
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network connection error",
    };
  }
};

export const deleteJob = async (
  jobId: string,
  token: string
): Promise<JobResponse> => {
  try {
    const response = await fetch(`${API_URL}/jobs/${jobId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network connection error",
    };
  }
};

export interface ApplyJobData {
  resume: File;
  cover_letter: string;
}

export interface ApplyJobResponse {
  success: boolean;
  message: string;
  data?: {
    application_id: string;
  };
}

export const applyJob = async (
  jobId: string,
  data: ApplyJobData
): Promise<ApplyJobResponse> => {
  try {
    const token = getToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const formData = new FormData();
    formData.append("resume", data.resume);
    formData.append("cover_letter", data.cover_letter);

    const response = await fetch(`${API_URL}/jobs/${jobId}/apply`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    console.log(response);
    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network connection error",
    };
  }
};

export const getAppliedJobs = async (): Promise<AppliedJobsResponse> => {
  try {
    const token = getToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required",
      };
    }

    const response = await fetch(`${API_URL}/jobs/applied`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message: "Network connection error",
    };
  }
};
