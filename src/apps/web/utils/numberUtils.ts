
export const formatCurrency = (
  amount: number | string,
  locale: string = 'vi-VN'
): string => {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numAmount)) return '0';
  
  return new Intl.NumberFormat(locale).format(numAmount);
};

export const formatNumber = (
  number: number | string,
  locale: string = 'vi-VN'
): string => {
  const num = typeof number === 'string' ? parseFloat(number) : number;
  
  if (isNaN(num)) return '0';
  
  return new Intl.NumberFormat(locale).format(num);
};

export const formatSalaryRange = (
  min: number | string,
  max: number | string,
  isNegotiable: boolean = false
): string => {
  const minNum = typeof min === 'string' ? parseFloat(min) : min;
  const maxNum = typeof max === 'string' ? parseFloat(max) : max;
  
  if (isNaN(minNum) || isNaN(maxNum)) return 'Thỏa thuận';
  
  if (isNegotiable) return 'Thỏa thuận';
  
  if (minNum === maxNum) {
    return formatNumber(minNum);
  }
  
  return `${formatNumber(minNum)} - ${formatNumber(maxNum)}`;
};

export const formatCompactNumber = (
  number: number | string,
  locale: string = 'vi-VN'
): string => {
  const num = typeof number === 'string' ? parseFloat(number) : number;
  
  if (isNaN(num)) return '0';
  
  return new Intl.NumberFormat(locale, {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);
};

export const formatPercentage = (
  value: number | string,
  decimals: number = 1
): string => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(num)) return '0%';
  
  return `${num.toFixed(decimals)}%`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDuration = (seconds: number): string => {
  if (seconds < 60) return `${seconds}s`;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  
  const days = Math.floor(hours / 24);
  return `${days}d`;
};

export const formatISODate = (
  isoString: string | Date,
  options?: Intl.DateTimeFormatOptions
): string => {
  try {
    const date = new Date(isoString);
    
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      ...options
    };
    
    return date.toLocaleDateString('vi-VN', defaultOptions);
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatISODateTime = (
  isoString: string | Date,
  options?: Intl.DateTimeFormatOptions
): string => {
  try {
    const date = new Date(isoString);
    
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    const defaultOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      ...options
    };
    
    return date.toLocaleString('vi-VN', defaultOptions);
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatISORelativeTime = (isoString: string | Date): string => {
  try {
    const date = new Date(isoString);
    
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    return formatRelativeTime(date);
  } catch (error) {
    return 'Invalid date';
  }
};

export const formatDateRange = (
  startDate: string | Date,
  endDate?: string | Date
): string => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : null;
  
  if (isNaN(start.getTime()) || (end && isNaN(end.getTime()))) {
    return 'Invalid date';
  }
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  
  if (!end) {
    return formatDate(start);
  }
  
  return `${formatDate(start)} - ${formatDate(end)}`;
};

export const formatRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

export const parseCurrency = (currencyString: string): number => {
  const cleaned = currencyString.replace(/[^\d.-]/g, '');
  return parseFloat(cleaned) || 0;
};

export const isValidNumber = (value: string | number): boolean => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && isFinite(num);
};

export const roundToNearestThousand = (number: number): number => {
  return Math.round(number / 1000) * 1000;
};

export const randomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const calculatePercentage = (part: number, total: number): number => {
  if (total === 0) return 0;
  return (part / total) * 100;
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  
  if (cleaned.length === 11) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone;
};

export const formatTaxCode = (taxCode: string): string => {
  const cleaned = taxCode.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
  }
  
  if (cleaned.length === 13) {
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  }
  
  return taxCode;
}; 