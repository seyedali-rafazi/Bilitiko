'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaCheckCircle, FaHome, FaTicketAlt, FaPlane, FaBus, FaTrain } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { clearBookingStorage } from '@/lib/booking-storage';
import { useAppDispatch } from '@/lib/store/hooks';
import { clearBooking } from '@/lib/store/bookingSlice';
import { getTickets } from '@/lib/session';
import type { UserTicket } from '@/lib/types';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const code = searchParams.get('code') || 'BL-000000';
  const amount = Number(searchParams.get('amount') || 2500000);
  const [ticket, setTicket] = useState<UserTicket | null>(null);

  useEffect(() => {
    dispatch(clearBooking());
    clearBookingStorage();
  }, [dispatch]);

  useEffect(() => {
    const tickets = getTickets();
    const foundTicket = tickets.find((t) => t.trackingCode === code);
    if (foundTicket) {
      setTicket(foundTicket);
    }
  }, [code]);

  const getTicketIcon = () => {
    if (!ticket) return <FaTicketAlt className="text-primary-blue text-2xl" />;
    
    switch (ticket.type) {
      case 'flight':
        return <FaPlane className="text-primary-blue text-2xl -rotate-45" />;
      case 'bus':
        return <FaBus className="text-primary-blue text-2xl" />;
      case 'train':
        return <FaTrain className="text-primary-blue text-2xl" />;
      default:
        return <FaTicketAlt className="text-primary-blue text-2xl" />;
    }
  };

  return (
    <PageLayout showFooter={false} mobileTitle="پرداخت موفق">
      <div className="max-w-md mx-auto px-4 py-12 text-center">
        <FaCheckCircle className="text-status-success text-6xl mx-auto mb-6" />
        <h1 className="text-xl font-bold text-neutral-gray8 mb-2">پرداخت با موفقیت انجام شد</h1>
        <p className="text-sm text-neutral-gray6 mb-6">بلیط شما صادر شد و در بلیط‌های من قابل مشاهده است</p>

        {/* Ticket Details Card */}
        {ticket && (
          <div className="bg-white border border-neutral-gray2 rounded-xl p-4 mb-4 text-right">
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-primary-tint1 p-2 rounded-lg">
                {getTicketIcon()}
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-bold text-neutral-gray8">{ticket.title}</h3>
                <p className="text-xs text-neutral-gray6 mt-1">{ticket.subtitle}</p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Summary */}
        <div className="bg-status-successBg border border-status-success/20 rounded-xl p-4 mb-8 text-right space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-gray6">کد پیگیری</span>
            <span className="font-bold text-neutral-gray8 ltr-input">{code}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-gray6">مبلغ پرداختی</span>
            <span className="font-bold text-primary-blue">{amount.toLocaleString('fa-IR')} تومان</span>
          </div>
          {ticket && (
            <div className="flex justify-between text-sm">
              <span className="text-neutral-gray6">تاریخ</span>
              <span className="font-bold text-neutral-gray8">{ticket.date}</span>
            </div>
          )}
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
