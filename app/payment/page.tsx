'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowRight, FaLock } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import PaymentMethodSelector, { CardForm } from '@/components/payment/PaymentForm';
import OrderSummary from '@/components/payment/OrderSummary';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { MOCK_FLIGHTS } from '@/lib/mock-data';
import { addTicket, generateTrackingCode } from '@/lib/session';
import type { BookingData, UserTicket } from '@/lib/types';

export default function PaymentPage() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      router.push('/');
    }
  }, [router]);

  const flight = bookingData?.flightId
    ? MOCK_FLIGHTS.find((f) => f.id === Number(bookingData.flightId))
    : undefined;

  const pricePerTicket = flight?.price ?? 2500000;

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData || processing) return;

    setProcessing(true);
    setTimeout(() => {
      const trackingCode = generateTrackingCode('BL');
      const totalPrice = pricePerTicket * bookingData.passengers.length;
      const today = new Date().toLocaleDateString('fa-IR');

      const title = flight
        ? `${flight.origin} → ${flight.destination}`
        : 'بلیط پرواز';
      const subtitle = flight
        ? `${flight.airline} • ${flight.flightNumber} • ${flight.departureTime}`
        : `مسافران: ${bookingData.passengers.length} نفر`;

      const ticket: UserTicket = {
        id: trackingCode,
        type: 'flight',
        title,
        subtitle,
        date: today,
        price: totalPrice,
        status: 'confirmed',
        trackingCode,
        airline: flight?.airline,
        from: flight?.origin,
        to: flight?.destination,
      };

      addTicket(ticket);
      localStorage.removeItem('bookingData');
      router.push(`/payment/success?code=${trackingCode}&amount=${totalPrice}`);
    }, 1500);
  };

  if (!bookingData) {
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
                      <div className="animate-spin">⏳</div>
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
            <OrderSummary bookingData={bookingData} pricePerTicket={pricePerTicket} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
