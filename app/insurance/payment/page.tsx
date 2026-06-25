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
import { addTicket, clearInsuranceBooking, getInsuranceBooking } from '@/lib/session';
import { insuranceApi } from '@/lib/api';
import type { InsuranceBookingData, InsurancePlan, UserTicket } from '@/lib/types';

function getSelectedPlan(planId: string): InsurancePlan | undefined {
  try {
    const raw = localStorage.getItem('bilito-selected-insurance-plan');
    if (raw) {
      const stored: InsurancePlan = JSON.parse(raw);
      if (String(stored._id) === String(planId)) return stored;
    }
  } catch {
    // ignore
  }
  return getInsurancePlan(planId);
}

function InsurancePaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get('plan') || '';
  const plan = getSelectedPlan(planId);

  const [booking, setBooking] = useState<InsuranceBookingData | null>(null);
  const [ready, setReady] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plan || !booking) return;

    setProcessing(true);
    setError(null);

    try {
      const apiResponse = await insuranceApi.createBooking({
        plan_id: String(plan._id),
        first_name: booking.firstName,
        last_name: booking.lastName,
        national_id: booking.nationalId,
        birth_date: booking.birthDate,
        destination: booking.destination,
        start_date: booking.startDate,
        end_date: booking.endDate,
        phone: booking.phone,
        email: booking.email,
      });

      // Save ticket locally for the profile/tickets view
      const ticket: UserTicket = {
        _id: apiResponse.tracking_code,
        type: 'insurance',
        title: apiResponse.plan_title,
        subtitle: `${apiResponse.first_name} ${apiResponse.last_name} • ${apiResponse.destination}`,
        date: apiResponse.start_date,
        price: apiResponse.plan_price,
        status: 'confirmed',
        trackingCode: apiResponse.tracking_code,
        planId: apiResponse.plan_id,
        coverage: apiResponse.plan_coverage,
        destination: apiResponse.destination,
      };

      addTicket(ticket);
      clearInsuranceBooking();

      router.push(
        `/insurance/confirmation?status=success&code=${apiResponse.tracking_code}&amount=${apiResponse.plan_price}`
      );
    } catch (err: unknown) {
      setProcessing(false);
      const message =
        err instanceof Error ? err.message : 'خطا در ثبت بیمه. لطفاً دوباره تلاش کنید.';
      setError(message);
    }
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
                <span className="font-medium ltr-input text-xs">
                  {booking.startDate} – {booking.endDate}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-neutral-gray2">
                <span className="font-bold">مجموع</span>
                <span className="font-bold text-primary">
                  {plan.price.toLocaleString('fa-IR')} تومان
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="bg-status-errorBg border border-status-error/20 rounded-xl p-4 text-center">
            <p className="text-sm text-status-error">{error}</p>
          </div>
        )}

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
            {processing ? 'در حال پردازش...' : <><FaLock /> پرداخت امن</>}
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
