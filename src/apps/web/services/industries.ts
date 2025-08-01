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

  // Sort categories and their children
  categories.forEach(category => {
    category.children.sort((a, b) => a.name.localeCompare(b.name, 'en'));
  });

  return categories.sort((a, b) => a.name.localeCompare(b.name, 'en'));
};

export const debugIndustriesStructure = (industries: Industry[]): void => {
  console.log('=== Industries Structure Debug ===');
  console.log('Total industries:', industries.length);
  
  const parents = industries.filter(i => i.parent_id === null);
  const children = industries.filter(i => i.parent_id !== null);
  
  console.log('Parent industries:', parents.length);
  console.log('Child industries:', children.length);
  
  console.log('\nParent Industries:');
  parents.forEach(parent => {
    console.log(`- ${parent.name} (ID: ${parent.id})`);
  });
  
  console.log('\nChild Industries:');
  children.forEach(child => {
    const parent = parents.find(p => p.id === child.parent_id);
    console.log(`- ${child.name} (ID: ${child.id}) -> Parent: ${parent?.name || 'NOT FOUND'} (${child.parent_id})`);
  });
  
  const categories = getIndustriesByCategory(industries);
  console.log('\nGenerated Categories:');
  categories.forEach(cat => {
    console.log(`- ${cat.name}: ${cat.children.length} children`);
    if (cat.children.length > 0) {
      cat.children.forEach(child => {
        console.log(`  * ${child.name}`);
      });
    }
  });
};

// Test data với cấu trúc parent-child
export const testHierarchicalData: Industry[] = [
  // Parent industries
  {
    id: "parent-1",
    name: "Software & IT",
    description: "N/A",
    parent_id: null,
    created_at: "2025-07-30T14:27:59.313Z",
    status: "Active"
  },
  {
    id: "parent-2", 
    name: "Marketing & Advertising",
    description: "N/A",
    parent_id: null,
    created_at: "2025-07-30T14:28:17.973Z",
    status: "Active"
  },
  // Child industries for Software & IT
  {
    id: "child-1",
    name: "Frontend Development",
    description: "N/A",
    parent_id: "parent-1",
    created_at: "2025-07-30T14:27:59.313Z",
    status: "Active"
  },
  {
    id: "child-2",
    name: "Backend Development", 
    description: "N/A",
    parent_id: "parent-1",
    created_at: "2025-07-30T14:27:59.313Z",
    status: "Active"
  },
  // Child industries for Marketing & Advertising
  {
    id: "child-3",
    name: "Digital Marketing",
    description: "N/A", 
    parent_id: "parent-2",
    created_at: "2025-07-30T14:28:17.973Z",
    status: "Active"
  },
  {
    id: "child-4",
    name: "Content Marketing",
    description: "N/A",
    parent_id: "parent-2", 
    created_at: "2025-07-30T14:28:17.973Z",
    status: "Active"
  }
];

// Test function
export const testHierarchicalLogic = (): void => {
  console.log('=== Testing Hierarchical Logic ===');
  debugIndustriesStructure(testHierarchicalData);
}; 