'use client';

import { ReactNode } from 'react';
import AppSplash from './AppSplash';
import NavigationProgress from './NavigationProgress';
import { AuthProvider } from '@/components/providers/AuthProvider';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AppSplash />
      <NavigationProgress />
      {children}
    </AuthProvider>
  );
}
