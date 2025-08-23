import {getToken} from "../utils/auth";
export interface JobRecommendation {
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
  scheduled_at?: string | null;
  created_at: string;
  updated_at: string;
  skills: string;
  company_name?: string;
  match_score: number;
}

export interface GenerateRecommendationResponse {
  success: boolean;
  message: string;
  data?: {
    totalMatches: number;
    userId: string;
  };
}

export interface RecommendedJobsResponse {
  success: boolean;
  message: string;
  data?: JobRecommendation[];
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const generateRecommendations = async (): Promise<GenerateRecommendationResponse> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/recommendations/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    throw error;
  }
};

export const getRecommendedJobs = async (params?: {
  page?: number;
  limit?: number;
  location?: string;
  keyword?: string;
}): Promise<RecommendedJobsResponse> => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('No authentication token found');
    }

    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.location) queryParams.append('location', params.location);
    if (params?.keyword) queryParams.append('keyword', params.keyword);

    const url = `${API_URL}/jobs/recommended${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching recommended jobs:', error);
    throw error;
  }
};
