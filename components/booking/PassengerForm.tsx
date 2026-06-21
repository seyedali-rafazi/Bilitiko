import { FaUser, FaIdCard, FaCalendarAlt, FaVenusMars } from 'react-icons/fa';
import PersianDatePicker from '@/components/ui/PersianDatePicker';
import type { Passenger } from '@/lib/types';

interface PassengerFormProps {
  passenger: Passenger;
  index: number;
  onChange: (index: number, field: string, value: string) => void;
}

export default function PassengerForm({ passenger, index, onChange }: PassengerFormProps) {
  return (
    <div className="bg-white border border-neutral-gray2 rounded-lg search-box-shadow p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-blue w-12 h-12 rounded-xl flex items-center justify-center">
          <FaUser className="text-white text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-neutral-gray8">مسافر {index + 1}</h2>
          {index === 0 && (
            <span className="text-sm text-primary-blue font-semibold">مسافر اصلی</span>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-neutral-gray8 font-bold text-sm">
            <FaUser className="text-primary-blue" />
            نام *
          </label>
          <input
            type="text"
            value={passenger.firstName}
            onChange={(e) => onChange(index, 'firstName', e.target.value)}
            className="w-full px-5 py-4 border border-neutral-gray3 rounded-lg input-focus"
            placeholder="نام خود را وارد کنید"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-neutral-gray8 font-bold text-sm">
            <FaUser className="text-primary-blue" />
            نام خانوادگی *
          </label>
          <input
            type="text"
            value={passenger.lastName}
            onChange={(e) => onChange(index, 'lastName', e.target.value)}
            className="w-full px-5 py-4 border border-neutral-gray3 rounded-lg input-focus"
            placeholder="نام خانوادگی خود را وارد کنید"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-neutral-gray8 font-bold text-sm">
            <FaIdCard className="text-primary-blue" />
            کد ملی *
          </label>
          <input
            type="text"
            value={passenger.nationalId}
            onChange={(e) => onChange(index, 'nationalId', e.target.value)}
            className="w-full px-5 py-4 border border-neutral-gray3 rounded-lg input-focus"
            placeholder="کد ملی ۱۰ رقمی"
            pattern="[0-9]{10}"
            maxLength={10}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-neutral-gray8 font-bold text-sm">
            <FaCalendarAlt className="text-primary-blue" />
            تاریخ تولد *
          </label>
          <PersianDatePicker
            value={passenger.birthDate}
            onChange={(value) => onChange(index, 'birthDate', value)}
            placeholder="تاریخ تولد"
            required
            maxDate={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center gap-2 text-neutral-gray8 font-bold text-sm">
            <FaVenusMars className="text-primary-blue" />
            جنسیت *
          </label>
          <div className="grid grid-cols-2 gap-4">
            {(['male', 'female'] as const).map((gender) => (
              <label
                key={gender}
                className={`flex items-center justify-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  passenger.gender === gender
                    ? 'border-primary-blue bg-primary-tint1'
                    : 'border-neutral-gray3 hover:border-primary-blue'
                }`}
              >
                <input
                  type="radio"
                  name={`gender-${index}`}
                  value={gender}
                  checked={passenger.gender === gender}
                  onChange={(e) => onChange(index, 'gender', e.target.value)}
                  className="w-5 h-5"
                />
                <span className="font-semibold text-neutral-gray8">
                  {gender === 'male' ? 'مرد' : 'زن'}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
