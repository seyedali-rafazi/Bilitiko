'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaHome, FaTicketAlt } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function ConfirmationPage() {
  const [trackingCode, setTrackingCode] = useState('');

  useEffect(() => {
    setTrackingCode(`BL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);
  }, []);

  return (
    <PageLayout showFooter={false}>
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <Card padding="lg">
          <div className="text-6xl mb-6">🎉</div>
          <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-neutral-gray8 mb-4">
            پرداخت با موفقیت انجام شد!
          </h1>
          <p className="text-neutral-gray6 text-lg mb-2">
            بلیط شما با موفقیت صادر شد و به ایمیل شما ارسال خواهد شد.
          </p>
          {trackingCode && (
            <p className="text-neutral-gray5 text-sm mb-8">کد پیگیری: {trackingCode}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profile?tab=trips">
              <Button>
                <FaTicketAlt />
                <span>مشاهده سفرهای من</span>
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary">
                <FaHome />
                <span>بازگشت به صفحه اصلی</span>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
