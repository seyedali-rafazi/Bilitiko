'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaCheckCircle, FaHome, FaTicketAlt, FaTimesCircle } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function InsuranceConfirmationContent() {
  const searchParams = useSearchParams();
  const success = searchParams.get('status') !== 'failed';
  const code = searchParams.get('code') || 'IN-000000';
  const amount = Number(searchParams.get('amount') || 350000);

  return (
    <PageLayout showFooter={false} mobileTitle={success ? 'پرداخت موفق' : 'پرداخت ناموفق'}>
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        {success ? (
          <>
            <FaCheckCircle className="text-status-success text-6xl mx-auto mb-6" />
            <h1 className="text-xl font-bold text-neutral-gray8 mb-2">بیمه‌نامه صادر شد</h1>
            <p className="text-sm text-neutral-gray6 mb-6">بیمه‌نامه در بلیط‌های من ثبت شد</p>
            <div className="bg-status-successBg border border-status-success/20 rounded-xl p-4 mb-8 text-right space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-gray6">کد پیگیری</span>
                <span className="font-bold ltr-input">{code}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-gray6">مبلغ</span>
                <span className="font-bold text-primary">{amount.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <FaTimesCircle className="text-status-error text-6xl mx-auto mb-6" />
            <h1 className="text-xl font-bold text-neutral-gray8 mb-2">پرداخت ناموفق</h1>
            <p className="text-sm text-neutral-gray6 mb-8">لطفاً مجدداً تلاش کنید</p>
          </>
        )}

        <div className="flex flex-col gap-3">
          {success ? (
            <Link href="/profile?tab=tickets"><Button fullWidth><FaTicketAlt /> بلیط‌های من</Button></Link>
          ) : (
            <Link href="/insurance/payment"><Button fullWidth>تلاش مجدد</Button></Link>
          )}
          <Link href="/"><Button fullWidth variant="secondary"><FaHome /> صفحه اصلی</Button></Link>
        </div>
      </div>
    </PageLayout>
  );
}

export default function InsuranceConfirmationPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <InsuranceConfirmationContent />
    </Suspense>
  );
}
