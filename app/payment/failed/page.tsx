'use client';

import Link from 'next/link';
import { FaTimesCircle, FaRedo, FaHome } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';

export default function PaymentFailedPage() {
  return (
    <PageLayout showFooter={false} mobileTitle="پرداخت ناموفق">
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <FaTimesCircle className="text-status-error text-6xl mx-auto mb-6" />
        <h1 className="text-xl font-bold text-neutral-gray8 mb-2">پرداخت ناموفق بود</h1>
        <p className="text-sm text-neutral-gray6 mb-8">
          تراکنش شما انجام نشد. لطفاً مجدداً تلاش کنید یا روش پرداخت دیگری انتخاب کنید.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/payment"><Button fullWidth><FaRedo /> تلاش مجدد</Button></Link>
          <Link href="/"><Button fullWidth variant="secondary"><FaHome /> بازگشت به خانه</Button></Link>
        </div>
      </div>
    </PageLayout>
  );
}
