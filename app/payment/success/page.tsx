'use client';

import Link from 'next/link';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaCheckCircle, FaHome, FaTicketAlt } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || 'BL-000000';
  const amount = Number(searchParams.get('amount') || 2500000);

  return (
    <PageLayout showFooter={false} mobileTitle="پرداخت موفق">
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <FaCheckCircle className="text-status-success text-6xl mx-auto mb-6" />
        <h1 className="text-xl font-bold text-neutral-gray8 mb-2">پرداخت با موفقیت انجام شد</h1>
        <p className="text-sm text-neutral-gray6 mb-6">بلیط شما صادر شد و در بلیط‌های من قابل مشاهده است</p>

        <div className="bg-status-successBg border border-status-success/20 rounded-xl p-4 mb-8 text-right space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-gray6">کد پیگیری</span>
            <span className="font-bold text-neutral-gray8 ltr-input">{code}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-gray6">مبلغ</span>
            <span className="font-bold text-primary-blue">{amount.toLocaleString('fa-IR')} تومان</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/profile?tab=tickets"><Button fullWidth><FaTicketAlt /> بلیط‌های من</Button></Link>
          <Link href="/"><Button fullWidth variant="secondary"><FaHome /> صفحه اصلی</Button></Link>
        </div>
      </div>
    </PageLayout>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
