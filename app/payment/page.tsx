'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaLock } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import PaymentMethodSelector, { CardForm } from '@/components/payment/PaymentForm';
import OrderSummary from '@/components/payment/OrderSummary';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {
  bookingStateToData,
  createTicketFromBooking,
  resolveBookingState,
} from '@/lib/booking-storage';
import { useAppSelector } from '@/lib/store/hooks';
import { addTicket, generateTrackingCode } from '@/lib/session';

export default function PaymentPage() {
  const router = useRouter();
  const bookingState = useAppSelector((state) => state.booking);
  const completingPayment = useRef(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [processing, setProcessing] = useState(false);
  const [ready, setReady] = useState(false);

  const bookingData = useMemo(() => bookingStateToData(bookingState), [bookingState]);
  const resolved = useMemo(() => resolveBookingState(bookingState), [bookingState]);
  const pricePerTicket = resolved?.pricePerTicket ?? 0;

  useEffect(() => {
    if (completingPayment.current) return;
    if (!resolved || bookingState.passengers.length === 0) {
      router.push('/');
      return;
    }
    setReady(true);
  }, [resolved, bookingState.passengers.length, router]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resolved || processing) return;

    setProcessing(true);
    completingPayment.current = true;
    const snapshot = bookingData;

    setTimeout(() => {
      const trackingCode = generateTrackingCode('BL');
      const ticket = createTicketFromBooking(snapshot, trackingCode);
      if (!ticket) {
        completingPayment.current = false;
        setProcessing(false);
        return;
      }

      addTicket(ticket);
      router.push(`/payment/success?code=${trackingCode}&amount=${ticket.price}`);
    }, 1500);
  };

  if (!ready || !resolved) {
    return (
      <PageLayout showFooter={false} mobileTitle="پرداخت">
        <LoadingSpinner />
      </PageLayout>
    );
  }

  return (
    <PageLayout showFooter={false} mobileTitle="پرداخت">
      <div className="hidden lg:block">
        <PageHeader title="پرداخت نهایی" subtitle="یک قدم تا تکمیل رزرو شما" />
      </div>
      <div className="lg:hidden px-4 py-4 border-b border-neutral-gray2">
        <h1 className="font-bold text-neutral-gray8">پرداخت نهایی</h1>
        <p className="text-sm text-neutral-gray6">یک قدم تا تکمیل رزرو</p>
      </div>

      <div className="container mx-auto px-4 pb-8 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handlePayment} noValidate className="space-y-6">
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

              <div className="flex gap-4">
                <Button type="button" variant="secondary" fullWidth onClick={() => router.back()} disabled={processing}>
                  <FaArrowRight />
                  <span>بازگشت</span>
                </Button>
                <Button type="submit" fullWidth disabled={processing}>
                  {processing ? (
                    <>
                      <span>در حال پردازش...</span>
                    </>
                  ) : (
                    <>
                      <FaLock />
                      <span>پرداخت امن</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary
              bookingData={bookingData}
              resolved={resolved}
              pricePerTicket={pricePerTicket}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
