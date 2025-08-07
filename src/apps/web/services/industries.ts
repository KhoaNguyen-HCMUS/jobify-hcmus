const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Industry {
  id: string;
  name: string;
  description: string;
  parent_id: string | null;
  created_at: string;
  status: string;
}

export interface IndustriesResponse {
  success: boolean;
  message: string;
  data?: Industry[];
}

export interface IndustryCategory {
  id: string;
  name: string;
  children: Industry[];
}

export const getAllIndustries = async (): Promise<IndustriesResponse> => {
  try {
    const response = await fetch(`${API_URL}/industries`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    
    if (result.success && result.data) {
      const sortedIndustries = result.data.sort((a: Industry, b: Industry) => 
        a.name.localeCompare(b.name, 'en')
      );
      
      return {
        success: true,
        message: 'Industries fetched successfully',
        data: sortedIndustries
      };
    }
    
    return result;
  } catch (error) {
    return {
      success: false,
      message: 'Network connection error',
    };
  }
};

export const getIndustriesByCategory = (industries: Industry[]): IndustryCategory[] => {
  if (!industries || industries.length === 0) {
    return [];
  }

  const categories: IndustryCategory[] = [];
  const categoryMap = new Map<string, IndustryCategory>();

  // First pass: Create all categories (parent industries)
  industries.forEach(industry => {
    if (industry.parent_id === null) {
      const category: IndustryCategory = {
        id: industry.id,
        name: industry.name,
        children: []
      };
      categories.push(category);
      categoryMap.set(industry.id, category);
    }
  });

  // Second pass: Add children to their parents
  industries.forEach(industry => {
    if (industry.parent_id !== null) {
      const parent = categoryMap.get(industry.parent_id);
      if (parent) {
        parent.children.push(industry);
      } else {
        console.warn(`Parent industry with id ${industry.parent_id} not found for child ${industry.name}`);
      }
    }
  });

  categories.forEach(category => {
    category.children.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  });

  return categories.sort((a, b) => a.name.localeCompare(b.name, 'en'));
};
