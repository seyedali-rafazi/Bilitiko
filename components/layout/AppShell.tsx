'use client';

import { ReactNode } from 'react';
import AppSplash from './AppSplash';
import NavigationProgress from './NavigationProgress';
import { AuthProvider } from '@/components/providers/AuthProvider';
import StoreProvider from '@/components/providers/StoreProvider';
import { ToastProvider } from '@/components/providers/ToastProvider';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <AuthProvider>
        <ToastProvider>
          <AppSplash />
          <NavigationProgress />
          {children}
        </ToastProvider>
      </AuthProvider>
    </StoreProvider>
  );
}
