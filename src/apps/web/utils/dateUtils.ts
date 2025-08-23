export const formatDateForInput = (date: string | null | undefined): string => {
  if (!date) return "";
  
  if (typeof date === 'string') {
    // Handle ISO string format
    if (date.includes('T')) {
      return date.split('T')[0];
    }
    // Handle date string format
    return date;
  }
  
  return "";
};

export const formatDateForDisplay = (date: string | null | undefined): string => {
  if (!date) return "Not specified";
  
  if (typeof date === 'string') {
    try {
      const dateObj = new Date(date);
      return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return date;
    }
  }
  
  return "Not specified";
};

export const getDaysAgo = (date: string | null | undefined): string => {
  if (!date) return "Unknown";
  
  try {
    const postedDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - postedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays === 1 ? "1 day ago" : `${diffDays} days ago`;
  } catch {
    return "Unknown";
  }
}; 