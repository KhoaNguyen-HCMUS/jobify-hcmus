'use client';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/auth/sign-in');
        return;
      }

      if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
        if (user.role === 'candidate') {
          router.push('/candidate/dashboard');
        } else if (user.role === 'company') {
          router.push('/recruiter/dashboard');
        } else if (user.role === 'admin') {
          router.push('/operator/dashboard');
        } else {
          router.push('/');
        }
        return;
      }
    }
  }, [loading, isAuthenticated, user?.role, router, allowedRoles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Đang tải...</div>
      </div>
    );
  }

  if (!isAuthenticated || (allowedRoles && user?.role && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
} 