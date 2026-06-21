'use client';

import { FaLock } from 'react-icons/fa';
import PaymentMethodIcon from '@/components/payment/PaymentMethodIcon';
import { formatCardNumber, formatCvv, formatExpiry } from '@/lib/card-format';
import { cn } from '@/lib/utils';

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  onChange: (method: string) => void;
}

export default function PaymentMethodSelector({ paymentMethod, onChange }: PaymentMethodSelectorProps) {
  const methods = [
    { id: 'card', title: 'کارت بانکی', desc: 'پرداخت با کارت‌های عضو شتاب' },
    { id: 'wallet', title: 'کیف پول', desc: 'پرداخت از کیف پول الکترونیکی' },
  ] as const;

  return (
    <div className="bg-white border border-neutral-gray2 rounded-xl search-box-shadow p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <PaymentMethodIcon type="card" active size="sm" />
        <h2 className="text-xl lg:text-2xl font-bold text-neutral-gray8">روش پرداخت</h2>
      </div>

      <div className="space-y-4">
        {methods.map((method) => {
          const selected = paymentMethod === method.id;
          return (
            <label
              key={method.id}
              className={cn(
                'flex items-center gap-4 p-5 lg:p-6 border rounded-xl cursor-pointer transition-all',
                selected
                  ? 'border-primary bg-primary-tint1 shadow-sm'
                  : 'border-neutral-gray3 hover:border-primary/40'
              )}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selected}
                onChange={(e) => onChange(e.target.value)}
                className="w-5 h-5 accent-primary"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-base lg:text-lg text-neutral-gray8">{method.title}</p>
                <p className="text-sm text-neutral-gray6">{method.desc}</p>
              </div>
              <PaymentMethodIcon type={method.id} active={selected} />
            </label>
          );
        })}
      </div>
    </div>
  );
}

interface CardFormProps {
  cardNumber: string;
  cvv: string;
  expiry: string;
  onCardNumberChange: (v: string) => void;
  onCvvChange: (v: string) => void;
  onExpiryChange: (v: string) => void;
  validate?: boolean;
}

export function CardForm({
  cardNumber,
  cvv,
  expiry,
  onCardNumberChange,
  onCvvChange,
  onExpiryChange,
  validate = false,
}: CardFormProps) {
  return (
    <div className="bg-white border border-neutral-gray2 rounded-xl search-box-shadow p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <PaymentMethodIcon type="card" active size="sm" />
        <h3 className="text-lg lg:text-xl font-bold text-neutral-gray8">اطلاعات کارت</h3>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-neutral-gray8 font-bold text-sm">شماره کارت *</label>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            value={cardNumber}
            onChange={(e) => onCardNumberChange(formatCardNumber(e.target.value))}
            placeholder="3498-2345-1234-6542"
            className="w-full px-5 py-4 border border-neutral-gray3 rounded-lg input-focus text-lg tracking-wider ltr-input font-mono"
            maxLength={19}
            required={validate}
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-neutral-gray8 font-bold text-sm">تاریخ انقضا *</label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              value={expiry}
              onChange={(e) => onExpiryChange(formatExpiry(e.target.value))}
              placeholder="MM/YY"
              className="w-full px-5 py-4 border border-neutral-gray3 rounded-lg input-focus text-lg ltr-input font-mono"
              maxLength={5}
              required={validate}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-neutral-gray8 font-bold text-sm">CVV2 *</label>
            <input
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              value={cvv}
              onChange={(e) => onCvvChange(formatCvv(e.target.value))}
              placeholder="000"
              className="w-full px-5 py-4 border border-neutral-gray3 rounded-lg input-focus text-lg ltr-input font-mono"
              maxLength={4}
              required={validate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SecurityBadge() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
      <div className="flex items-center gap-3">
        <FaLock className="text-green-600 text-2xl" />
        <div>
          <p className="text-sm font-bold text-green-800">پرداخت امن</p>
          <p className="text-xs text-green-700">از طریق درگاه بانکی معتبر</p>
        </div>
      </div>
    </div>
  );
}
