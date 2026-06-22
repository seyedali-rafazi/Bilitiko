import { FaUser, FaEnvelope, FaPhone, FaBus, FaPlane, FaTrain } from 'react-icons/fa';
import { SecurityBadge } from './PaymentForm';
import type { ResolvedBooking } from '@/lib/booking-storage';
import type { BookingData } from '@/lib/types';

interface OrderSummaryProps {
  bookingData: BookingData;
  resolved: ResolvedBooking;
  pricePerTicket: number;
}

export default function OrderSummary({ bookingData, resolved, pricePerTicket }: OrderSummaryProps) {
  const totalPrice = pricePerTicket * bookingData.passengers.length;

  const tripLabel =
    resolved.kind === 'flight'
      ? 'پرواز'
      : resolved.transportType === 'bus'
        ? 'اتوبوس'
        : 'قطار';

  const tripTitle =
    resolved.kind === 'flight'
      ? `${resolved.flight.origin} → ${resolved.flight.destination}`
      : `${resolved.trip.origin} → ${resolved.trip.destination}`;

  const tripDetail =
    resolved.kind === 'flight'
      ? `${resolved.flight.airline} • ${resolved.flight.flightNumber}`
      : `${resolved.trip.company} • ${resolved.trip.tripNumber}`;

  const TripIcon =
    resolved.kind === 'flight'
      ? FaPlane
      : resolved.transportType === 'bus'
        ? FaBus
        : FaTrain;

  return (
    <div className="bg-white border border-neutral-gray2 rounded-lg search-box-shadow p-8 sticky top-28">
      <h2 className="text-2xl font-bold mb-6 text-neutral-gray8">خلاصه سفارش</h2>

      <div className="bg-primary-tint1 rounded-lg p-4 mb-6 flex items-start gap-3">
        <div className="bg-white p-2 rounded-lg">
          <TripIcon className={`text-primary-blue text-lg ${resolved.kind === 'flight' ? '-rotate-45' : ''}`} />
        </div>
        <div className="flex-1 min-w-0 text-right">
          <p className="text-xs text-neutral-gray6 mb-0.5">{tripLabel}</p>
          <p className="font-bold text-neutral-gray8">{tripTitle}</p>
          <p className="text-xs text-neutral-gray6 mt-0.5">{tripDetail}</p>
        </div>
      </div>

      <div className="space-y-4 mb-6 pb-6 border-b border-neutral-gray2">
        <div className="flex justify-between items-center">
          <span className="text-neutral-gray6">تعداد مسافران:</span>
          <span className="font-bold text-neutral-gray8 text-lg">
            {bookingData.passengers.length} نفر
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-gray6">قیمت هر بلیط:</span>
          <span className="font-bold text-neutral-gray8">
            {pricePerTicket.toLocaleString('fa-IR')} تومان
          </span>
        </div>
        <div className="bg-green-50 rounded-lg p-4 flex justify-between items-center">
          <span className="text-green-700 font-semibold">تخفیف:</span>
          <span className="font-bold text-green-700">۰ تومان</span>
        </div>
      </div>

      <div className="bg-primary-tint1 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-neutral-gray8 font-bold text-lg">مجموع:</span>
          <div className="text-left">
            <div className="text-3xl font-bold text-primary-blue">
              {totalPrice.toLocaleString('fa-IR')}
            </div>
            <div className="text-neutral-gray6 text-sm">تومان</div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-gray2 pt-6 mb-6">
        <h3 className="font-bold mb-4 flex items-center gap-2 text-neutral-gray8">
          <FaUser className="text-primary-blue" />
          مسافران:
        </h3>
        <ul className="space-y-3">
          {bookingData.passengers.map((passenger, index) => (
            <li key={index} className="flex items-center gap-3 bg-primary-tint1 rounded-lg p-3">
              <div className="bg-primary-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                {index + 1}
              </div>
              <span className="text-neutral-gray8 font-semibold">
                {passenger.firstName} {passenger.lastName}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-neutral-gray2 pt-6">
        <h3 className="font-bold mb-4 flex items-center gap-2 text-neutral-gray8">
          <FaEnvelope className="text-primary-blue" />
          اطلاعات تماس:
        </h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm bg-primary-tint1 rounded-lg p-3">
            <FaEnvelope className="text-primary-blue" />
            <span className="text-neutral-gray7 break-all">{bookingData.contactInfo.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm bg-green-50 rounded-lg p-3">
            <FaPhone className="text-green-600" />
            <span className="text-neutral-gray7">{bookingData.contactInfo.phone}</span>
          </div>
        </div>
      </div>

      <SecurityBadge />
    </div>
  );
}
