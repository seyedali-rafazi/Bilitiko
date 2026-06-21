import { FaEnvelope, FaPhone, FaCheckCircle } from 'react-icons/fa';
import type { ContactInfo } from '@/lib/types';

interface ContactFormProps {
  contactInfo: ContactInfo;
  onChange: (info: ContactInfo) => void;
}

export default function ContactForm({ contactInfo, onChange }: ContactFormProps) {
  return (
    <div className="bg-white border border-neutral-gray2 rounded-lg search-box-shadow p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary-shade1 w-12 h-12 rounded-xl flex items-center justify-center">
          <FaEnvelope className="text-white text-xl" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-gray8">اطلاعات تماس</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-neutral-gray8 font-bold text-sm">
            <FaEnvelope className="text-primary-blue" />
            ایمیل *
          </label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => onChange({ ...contactInfo, email: e.target.value })}
            className="w-full px-5 py-4 border border-neutral-gray3 rounded-lg input-focus"
            placeholder="example@email.com"
            required
          />
          <p className="text-sm text-neutral-gray6 flex items-center gap-2">
            <FaCheckCircle className="text-green-600" />
            بلیط به این ایمیل ارسال می‌شود
          </p>
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-neutral-gray8 font-bold text-sm">
            <FaPhone className="text-primary-blue" />
            شماره موبایل *
          </label>
          <input
            type="tel"
            value={contactInfo.phone}
            onChange={(e) => onChange({ ...contactInfo, phone: e.target.value })}
            className="w-full px-5 py-4 border border-neutral-gray3 rounded-lg input-focus"
            pattern="09[0-9]{9}"
            placeholder="09123456789"
            required
          />
          <p className="text-sm text-neutral-gray6 flex items-center gap-2">
            <FaCheckCircle className="text-green-600" />
            برای ارسال پیامک تأیید
          </p>
        </div>
      </div>
    </div>
  );
}
