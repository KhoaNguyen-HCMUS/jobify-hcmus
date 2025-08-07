export interface AuthData {
  token: string;
  name: string;
  role: string;
  id: string;
}

export const saveAuthData = (data: AuthData) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authData', JSON.stringify(data));
    document.cookie = `authToken=${data.token}; path=/; max-age=86400; SameSite=Lax`;
  }
};

export const getAuthData = (): AuthData | null => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('authData');
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const getTokenFromCookie = (): string | null => {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const authTokenCookie = cookies.find(cookie => 
      cookie.trim().startsWith('authToken=')
    );
    return authTokenCookie ? authTokenCookie.split('=')[1] : null;
  }
  return null;
};

export const getToken = (): string | null => {
  const authData = getAuthData();
  return authData?.token || null;
};

export const getUserName = (): string | null => {
  const authData = getAuthData();
  return authData?.name || null;
};

export const getUserRole = (): string | null => {
  const authData = getAuthData();
  return authData?.role || null;
};

export const getUserId = (): string | null => {
  const authData = getAuthData();
  return authData?.id || null;
};

export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

export const clearAuthData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authData');
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}; 