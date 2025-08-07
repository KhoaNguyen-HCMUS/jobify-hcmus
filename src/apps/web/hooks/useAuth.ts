'use client';
import { useState, useEffect } from 'react';
import { getAuthData, isAuthenticated, getUserName, getUserRole, getToken } from '../utils/auth';

export const useAuth = () => {
  const [user, setUser] = useState<{
    name: string | null;
    role: string | null;
    token: string | null;
  }>({
    name: null,
    role: null,
    token: null,
  });
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authData = getAuthData();
      if (authData) {
        setUser({
          name: authData.name,
          role: authData.role,
          token: authData.token,
        });
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const updateUser = () => {
    const authData = getAuthData();
    if (authData) {
      setUser({
        name: authData.name,
        role: authData.role,
        token: authData.token,
      });
      setAuthenticated(true);
    } else {
      setUser({
        name: null,
        role: null,
        token: null,
      });
      setAuthenticated(false);
    }
  };

  return {
    user,
    loading,
    isAuthenticated: authenticated,
    updateUser,
    getUserName,
    getUserRole,
    getToken,
  };
};