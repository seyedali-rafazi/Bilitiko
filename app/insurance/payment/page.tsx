'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaLock } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import PaymentMethodSelector, { CardForm } from '@/components/payment/PaymentForm';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { getInsurancePlan } from '@/lib/insurance-data';
import {
  addTicket,
  clearInsuranceBooking,
  generateTrackingCode,
  getInsuranceBooking,
} from '@/lib/session';
import type { InsuranceBookingData, UserTicket } from '@/lib/types';

function InsurancePaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get('plan') || 'gold';
  const plan = getInsurancePlan(planId);

  const [booking, setBooking] = useState<InsuranceBookingData | null>(null);
  const [ready, setReady] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    setBooking(getInsuranceBooking());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || processing) return;
    if (!plan) {
      router.replace('/insurance');
      return;
    }
    if (!booking || booking.planId !== planId) {
      router.replace(`/insurance/booking?plan=${planId}`);
    }
  }, [ready, plan, booking, planId, router, processing]);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan || !booking) return;

    setProcessing(true);

    setTimeout(() => {
      const trackingCode = generateTrackingCode('IN');
      const ticket: UserTicket = {
        id: trackingCode,
        type: 'insurance',
        title: plan.title,
        subtitle: `${booking.firstName} ${booking.lastName} • ${booking.destination}`,
        date: booking.startDate,
        price: plan.price,
        status: 'confirmed',
        trackingCode,
        planId: plan.id,
        coverage: plan.coverage,
        destination: booking.destination,
      };

      addTicket(ticket);
      clearInsuranceBooking();

      router.push(`/insurance/confirmation?status=success&code=${trackingCode}&amount=${plan.price}`);
    }, 1500);
  };

  if (!ready || !plan || !booking) {
    return (
      <PageLayout showFooter={false} mobileTitle="پرداخت بیمه">
        <LoadingSpinner />
      </PageLayout>
    );
  }

  return (
    <PageLayout showFooter={false} mobileTitle="پرداخت بیمه">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-bold text-neutral-gray8 mb-4">خلاصه سفارش بیمه</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-gray6">طرح</span>
                <span className="font-medium">{plan.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-gray6">مقصد</span>
                <span className="font-medium">{booking.destination}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-gray6">بازه پوشش</span>
                <span className="font-medium ltr-input text-xs">{booking.startDate} – {booking.endDate}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-neutral-gray2">
                <span className="font-bold">مجموع</span>
                <span className="font-bold text-primary">{plan.price.toLocaleString('fa-IR')} تومان</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handlePay} noValidate className="space-y-4">
          <PaymentMethodSelector paymentMethod={paymentMethod} onChange={setPaymentMethod} />

          {paymentMethod === 'card' && (
            <CardForm
              cardNumber={cardNumber}
              cvv={cvv}
              expiry={expiry}
              onCardNumberChange={setCardNumber}
              onCvvChange={setCvv}
              onExpiryChange={setExpiry}
            />
          )}

          <Button type="submit" fullWidth disabled={processing}>
            {processing ? 'در حال پردازش...' : (<><FaLock /> پرداخت امن</>)}
          </Button>
        </form>
      </div>
    </PageLayout>
  );
}

export default function InsurancePaymentPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <InsurancePaymentContent />
    </Suspense>
  );
}
