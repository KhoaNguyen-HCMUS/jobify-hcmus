
export const getUserTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const getCurrentLocalTimeISO = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const getTomorrowLocalTimeISO = (hour: number = 9, minute: number = 0): string => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(hour, minute, 0, 0);
  
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  const hours = String(tomorrow.getHours()).padStart(2, '0');
  const minutes = String(tomorrow.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const localToUTC = (localDateTime: string): string => {
  if (!localDateTime) return '';
  
  const localDate = new Date(localDateTime);
  
  return localDate.toISOString();
};

export const utcToLocal = (utcDateTime: string): string => {
  if (!utcDateTime) return '';
  
  const utcDate = new Date(utcDateTime);
  
  const year = utcDate.getFullYear();
  const month = String(utcDate.getMonth() + 1).padStart(2, '0');
  const day = String(utcDate.getDate()).padStart(2, '0');
  const hours = String(utcDate.getHours()).padStart(2, '0');
  const minutes = String(utcDate.getMinutes()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const formatUTCForDisplay = (utcDateTime: string): string => {
  if (!utcDateTime) return '';
  
  const utcDate = new Date(utcDateTime);
  const userTimezone = getUserTimezone();
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: userTimezone
  }).format(utcDate);
};

export const isLocalDateTimeInFuture = (localDateTime: string): boolean => {
  if (!localDateTime) return false;
  
  const localDate = new Date(localDateTime);
  const now = new Date();
  
  return localDate > now;
};

export const getTimezoneOffsetString = (): string => {
  const offset = new Date().getTimezoneOffset();
  const hours = Math.abs(Math.floor(offset / 60));
  const minutes = Math.abs(offset % 60);
  const sign = offset <= 0 ? '+' : '-';
  
  return `${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

export const getTimezoneInfo = (): string => {
  const timezone = getUserTimezone();
  const offset = getTimezoneOffsetString();
  
  return `${timezone} (UTC${offset})`;
};
