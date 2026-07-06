'use client';

import { useState } from 'react';
import { FaBus, FaPlane, FaShieldAlt, FaTrain, FaTicketAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/shadcn/button';
import Badge from '@/components/ui/Badge';
import { getUser } from '@/lib/session';
import { downloadTicketPDF, type TicketData } from '@/lib/pdf-generator';
import { format as formatJalali } from 'date-fns-jalali';
import type { UserTicket } from '@/lib/types';

export const statusMap = {
  confirmed: { label: 'تأیید شده', className: 'bg-status-successBg text-status-successDark', variant: 'success' as const },
  pending: { label: 'در انتظار', className: 'bg-status-warningBg text-status-warning', variant: 'warning' as const },
  cancelled: { label: 'لغو شده', className: 'bg-neutral-gray1 text-neutral-gray6', variant: 'neutral' as const },
};

export function TicketRow({ ticket }: { ticket: UserTicket }) {
  const status = statusMap[ticket.status] ?? statusMap.confirmed;
  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-lg border border-neutral-gray2 bg-neutral-gray1/50">
      <div className="min-w-0">
        <p className="font-bold text-sm text-neutral-gray8 truncate">{ticket.title}</p>
        <p className="text-xs text-muted-foreground truncate">{ticket.subtitle}</p>
      </div>
      <span className={`text-[10px] px-2 py-1 rounded-full shrink-0 font-semibold ${status.className}`}>
        {status.label}
      </span>
    </div>
  );
}

export function TicketCard({ ticket }: { ticket: UserTicket }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const user = getUser();

  const getTicketIcon = () => {
    switch (ticket.type) {
      case 'flight':
        return { icon: <FaPlane className="text-primary-blue -rotate-45" />, bg: 'bg-primary-tint1' };
      case 'bus':
        return { icon: <FaBus className="text-primary-blue" />, bg: 'bg-primary-tint1' };
      case 'train':
        return { icon: <FaTrain className="text-primary-blue" />, bg: 'bg-primary-tint1' };
      case 'insurance':
        return { icon: <FaShieldAlt className="text-status-successDark" />, bg: 'bg-status-successBg' };
      default:
        return { icon: <FaTicketAlt className="text-primary-blue" />, bg: 'bg-primary-tint1' };
    }
  };

  const handleDownload = () => {
    if (ticket.type === 'insurance') {
      alert('دانلود بیمه‌نامه به زودی فعال می‌شود');
      return;
    }

    setIsDownloading(true);
    try {
      const ticketData: TicketData = {
        trackingCode: ticket.trackingCode,
        bookingDate: formatJalali(new Date(), 'yyyy/MM/dd - HH:mm'),
        passengers: [
          {
            firstName: user?.firstName || 'مسافر',
            lastName: user?.lastName || '',
            nationalId: '',
          },
        ],
        contact: {
          email: user?.email || '',
          phone: user?.phone || '',
        },
        pricing: {
          basePrice: ticket.price,
          tax: Math.round(ticket.price * 0.09),
          serviceFee: 50000,
          total: ticket.price,
        },
      };

      if (ticket.type === 'flight') {
        ticketData.flight = {
          flightNumber: ticket.trackingCode,
          airline: ticket.airline || 'ایران ایر',
          origin: ticket.from || 'تهران',
          destination: ticket.to || 'مشهد',
          departureDate: ticket.date,
          departureTime: ticket.departureTime || '14:30',
          arrivalTime: ticket.arrivalTime || '16:00',
          duration: '',
          class: 'اقتصادی',
        };
      } else if (ticket.type === 'bus' || ticket.type === 'train') {
        ticketData.transport = {
          type: ticket.type,
          company: ticket.company || (ticket.type === 'bus' ? 'شرکت اتوبوسرانی' : 'راه آهن'),
          origin: ticket.from || 'تهران',
          destination: ticket.to || 'مشهد',
          departureDate: ticket.date,
          departureTime: ticket.departureTime || '14:30',
          arrivalTime: ticket.arrivalTime || '20:00',
          seatNumbers: ticket.seatNumbers,
        };
      }

      downloadTicketPDF(ticketData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('خطا در ایجاد فایل PDF. لطفاً دوباره تلاش کنید.');
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  const { icon, bg } = getTicketIcon();

  return (
    <div className="bg-white border border-neutral-gray2 rounded-xl p-4 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2 rounded-lg ${bg}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-neutral-gray8">{ticket.title}</h3>
          <p className="text-xs text-neutral-gray6 mt-0.5">{ticket.subtitle}</p>
          <p className="text-[11px] text-neutral-gray5 mt-1">کد پیگیری: {ticket.trackingCode}</p>
        </div>
        <Badge variant={(statusMap[ticket.status] ?? statusMap.confirmed).variant}>
          {(statusMap[ticket.status] ?? statusMap.confirmed).label}
        </Badge>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-neutral-gray2">
        <span className="font-bold text-primary-blue text-sm">
          {(ticket.price ?? 0).toLocaleString('fa-IR')} تومان
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? 'در حال آماده‌سازی...' : 'دانلود بلیط'}
        </Button>
      </div>
    </div>
  );
}
