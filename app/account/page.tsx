'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { getUser, getUserDisplayName, getUserInitials } from '@/lib/session';
import { ACCOUNT_MENU } from '@/lib/mobile-nav';

export default function AccountPage() {
  const { user, ready, logout, requireAuth } = useAuth();
  const sessionUser = user ?? (ready ? getUser() : null);

  useEffect(() => {
    if (ready) requireAuth();
  }, [ready, requireAuth]);

  if (!ready || !sessionUser) {
    return (
      <PageLayout showFooter={false} mobileTitle="حساب کاربری">
        <LoadingSpinner />
      </PageLayout>
    );
  }

  return (
    <PageLayout showFooter={false} mobileTitle="حساب کاربری" isLoggedIn>
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-gradient-to-l from-primary-blue to-primary-shade1 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
              {getUserInitials(sessionUser)}
            </div>
            <div>
              <h2 className="text-lg font-bold">{getUserDisplayName(sessionUser)}</h2>
              <p className="text-sm text-white/80">{sessionUser.phone}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {ACCOUNT_MENU.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 bg-white border border-neutral-gray2 rounded-xl p-4 hover:bg-neutral-gray1 transition-colors"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium text-neutral-gray8">{item.label}</span>
            </Link>
          ))}
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-4 bg-white border border-status-error/30 rounded-xl p-4 text-status-error hover:bg-status-errorBg transition-colors"
          >
            <span className="text-2xl">🚪</span>
            <span className="font-medium">خروج از حساب</span>
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
