'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, ready } = useAuth();

  useEffect(() => {
    if (ready && !isLoggedIn) {
      // Store the intended destination to redirect back after login
      const returnUrl = encodeURIComponent(pathname);
      router.push(`/login?returnUrl=${returnUrl}`);
    }
  }, [ready, isLoggedIn, router, pathname]);

  // Show loading while checking auth status
  if (!ready) {
    return <LoadingSpinner message="در حال بررسی احراز هویت..." />;
  }

  // Show loading while redirecting
  if (!isLoggedIn) {
    return <LoadingSpinner message="در حال انتقال به صفحه ورود..." />;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}

