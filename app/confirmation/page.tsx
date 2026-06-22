'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaCheckCircle, FaHome, FaTicketAlt, FaDownload, FaFilePdf } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { downloadTicketPDF, type TicketData } from '@/lib/pdf-generator';
import { format as formatJalali } from 'date-fns-jalali';

export default function ConfirmationPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [ticketData, setTicketData] = useState<TicketData | null>(null);

  useEffect(() => {
    const code = `BL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    setTrackingCode(code);
    
    // Get booking data from localStorage
    try {
      const bookingDataStr = localStorage.getItem('bookingData');
      const searchDataStr = localStorage.getItem('searchData');
      const selectedFlightStr = localStorage.getItem('selectedFlight');
      const selectedTransportStr = localStorage.getItem('selectedTransport');
      const transportTypeStr = localStorage.getItem('transportType');
      
      const bookingData = bookingDataStr ? JSON.parse(bookingDataStr) : null;
      const searchData = searchDataStr ? JSON.parse(searchDataStr) : null;
      const selectedFlight = selectedFlightStr ? JSON.parse(selectedFlightStr) : null;
      const selectedTransport = selectedTransportStr ? JSON.parse(selectedTransportStr) : null;
      const transportType = transportTypeStr as 'bus' | 'train' | null;
      
      // Get actual passengers or use default
      const passengers = bookingData?.passengers && bookingData.passengers.length > 0
        ? bookingData.passengers
        : [
            {
              firstName: 'مسافر',
              lastName: 'نمونه',
              nationalId: '0123456789',
              birthDate: '1370/01/01',
              gender: 'male',
            },
          ];
      
      // Create ticket data
      const data: TicketData = {
        trackingCode: code,
        bookingDate: formatJalali(new Date(), 'yyyy/MM/dd - HH:mm'),
        passengers: passengers,
        contact: {
          email: bookingData?.contactInfo?.email || 'example@email.com',
          phone: bookingData?.contactInfo?.phone || '09123456789',
        },
        pricing: {
          basePrice: selectedFlight?.price || selectedTransport?.price || 2500000,
          tax: Math.round((selectedFlight?.price || selectedTransport?.price || 2500000) * 0.09),
          serviceFee: 50000,
          total: selectedFlight?.price || selectedTransport?.price || 2800000,
        },
      };

      // Add flight or transport specific data
      if (selectedFlight) {
        data.flight = {
          flightNumber: selectedFlight.flightNumber || 'IR-724',
          airline: selectedFlight.airline || 'ایران ایر',
          origin: searchData?.origin || selectedFlight.origin || 'تهران',
          destination: searchData?.destination || selectedFlight.destination || 'مشهد',
          departureDate: searchData?.departureDate || formatJalali(new Date(), 'yyyy/MM/dd'),
          departureTime: selectedFlight.departureTime || '14:30',
          arrivalTime: selectedFlight.arrivalTime || '16:00',
          duration: selectedFlight.duration || '1 ساعت و 30 دقیقه',
          class: searchData?.flightClass === 'business' ? 'بیزینس' : searchData?.flightClass === 'first' ? 'فرست کلاس' : 'اقتصادی',
        };
      } else if (selectedTransport && transportType) {
        data.transport = {
          type: transportType,
          company: selectedTransport.company || (transportType === 'bus' ? 'شرکت اتوبوسرانی' : 'راه آهن'),
          origin: searchData?.origin || selectedTransport.origin || 'تهران',
          destination: searchData?.destination || selectedTransport.destination || 'مشهد',
          departureDate: searchData?.departureDate || formatJalali(new Date(), 'yyyy/MM/dd'),
          departureTime: selectedTransport.departureTime || '14:30',
          arrivalTime: selectedTransport.arrivalTime || '20:00',
          seatNumbers: bookingData?.seatNumbers,
        };
      } else {
        // Default to flight if no specific data
        data.flight = {
          flightNumber: 'IR-724',
          airline: 'ایران ایر',
          origin: 'تهران',
          destination: 'مشهد',
          departureDate: formatJalali(new Date(), 'yyyy/MM/dd'),
          departureTime: '14:30',
          arrivalTime: '16:00',
          duration: '1 ساعت و 30 دقیقه',
          class: 'اقتصادی',
        };
      }
      
      setTicketData(data);
    } catch (error) {
      console.error('Error loading ticket data:', error);
    }
  }, []);

  const handleDownloadPDF = () => {
    if (!ticketData) {
      alert('اطلاعات بلیط در دسترس نیست. لطفاً دوباره تلاش کنید.');
      return;
    }

    setIsDownloading(true);
    
    try {
      downloadTicketPDF(ticketData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('خطا در ایجاد فایل PDF. لطفاً دوباره تلاش کنید.');
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

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
            <Button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="bg-green-600 hover:bg-green-700"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                  <span>در حال آماده‌سازی...</span>
                </>
              ) : (
                <>
                  <FaDownload />
                  <FaFilePdf />
                  <span>دانلود بلیط PDF</span>
                </>
              )}
            </Button>
            
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
