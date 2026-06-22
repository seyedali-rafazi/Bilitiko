'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import PassengerForm from '@/components/booking/PassengerForm';
import ContactForm from '@/components/booking/ContactForm';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { findFlight, findTrip } from '@/lib/booking-storage';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { saveBooking, selectFlight, selectTransport } from '@/lib/store/bookingSlice';
import type { Passenger, ContactInfo } from '@/lib/types';

function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const bookingState = useAppSelector((state) => state.booking);

  const flightId = searchParams.get('flightId');
  const tripId = searchParams.get('tripId');
  const transportType = searchParams.get('type') as 'bus' | 'train' | null;
  const passengersCount = parseInt(searchParams.get('passengers') || '1');

  const [passengers, setPassengers] = useState<Passenger[]>(
    Array.from({ length: passengersCount }, (_, i) => ({
      id: i + 1,
      firstName: '',
      lastName: '',
      nationalId: '',
      birthDate: '',
      gender: 'male',
    }))
  );

  const [contactInfo, setContactInfo] = useState<ContactInfo>({ email: '', phone: '' });
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    if (flightId) {
      const flight = findFlight(flightId);
      if (flight && bookingState.flight?.id !== flight.id) {
        dispatch(selectFlight(flight));
      }
    } else if (tripId && transportType) {
      const trip = findTrip(tripId, transportType);
      if (trip && bookingState.trip?.id !== trip.id) {
        dispatch(selectTransport({ trip, transportType }));
      }
    }
  }, [flightId, tripId, transportType, dispatch, bookingState.flight?.id, bookingState.trip?.id]);

  const handlePassengerChange = (index: number, field: string, value: string) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasFlight = Boolean(flightId || bookingState.flight);
    const hasTransport = Boolean(
      (tripId && transportType) || (bookingState.trip && bookingState.transportType)
    );

    if (!hasFlight && !hasTransport) {
      router.push('/');
      return;
    }

    dispatch(saveBooking({ passengers, contactInfo }));
    router.push('/payment');
  };

  return (
    <PageLayout showFooter={false} mobileTitle="اطلاعات مسافران">
      <PageHeader
        title="اطلاعات مسافران"
        subtitle="لطفاً اطلاعات مسافران را با دقت وارد کنید"
      />

      <div className="container mx-auto px-4 pb-8 max-w-5xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {passengers.map((passenger, index) => (
            <PassengerForm
              key={passenger.id}
              passenger={passenger}
              index={index}
              onChange={handlePassengerChange}
            />
          ))}

          <ContactForm contactInfo={contactInfo} onChange={setContactInfo} />

          <div className="bg-white border border-neutral-gray2 rounded-lg p-6">
            <label className="flex items-start gap-4 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 w-5 h-5"
                required
              />
              <span className="text-neutral-gray7 leading-relaxed">
                <span className="font-bold">قوانین و مقررات</span> سایت و{' '}
                <span className="font-bold">شرایط استرداد بلیط</span> را مطالعه کرده و می‌پذیرم
              </span>
            </label>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="secondary" fullWidth onClick={() => router.back()}>
              <FaArrowRight />
              <span>بازگشت</span>
            </Button>
            <Button type="submit" fullWidth>
              <span>ادامه و پرداخت</span>
              <FaArrowLeft />
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BookingContent />
    </Suspense>
  );
}
