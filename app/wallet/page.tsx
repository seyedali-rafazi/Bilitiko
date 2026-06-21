'use client';

import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const transactions = [
  { id: 1, type: 'شارژ کیف پول', amount: 5000000, date: '۱۴۰۳/۰۹/۱۰', status: 'success' },
  { id: 2, type: 'خرید بلیط', amount: -2500000, date: '۱۴۰۳/۰۹/۰۸', status: 'success' },
  { id: 3, type: 'استرداد بلیط', amount: 1800000, date: '۱۴۰۳/۰۸/۲۵', status: 'pending' },
];

export default function WalletPage() {
  const [chargeAmount, setChargeAmount] = useState('');
  const balance = 4300000;

  return (
    <PageLayout showFooter={false} mobileTitle="کیف پول" isLoggedIn>
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="bg-gradient-to-l from-primary-shade2 to-primary-blue rounded-xl p-6 text-white mb-6 text-center">
          <p className="text-sm text-white/80 mb-1">موجودی کیف پول</p>
          <p className="text-3xl font-bold">{balance.toLocaleString('fa-IR')}</p>
          <p className="text-sm">تومان</p>
        </div>

        <div className="bg-white border border-neutral-gray2 rounded-xl p-4 mb-6">
          <h3 className="font-bold text-neutral-gray8 mb-4">شارژ کیف پول</h3>
          <div className="flex gap-2 mb-4">
            {[1000000, 2000000, 5000000].map((amt) => (
              <button
                key={amt}
                onClick={() => setChargeAmount(amt.toString())}
                className="flex-1 py-2 text-xs border border-neutral-gray3 rounded-lg hover:border-primary-blue"
              >
                {(amt / 1000000).toLocaleString('fa-IR')}M
              </button>
            ))}
          </div>
          <Input
            label="مبلغ (تومان)"
            type="number"
            value={chargeAmount}
            onChange={(e) => setChargeAmount(e.target.value)}
            placeholder="مبلغ دلخواه"
          />
          <Button fullWidth className="mt-4">شارژ کیف پول</Button>
        </div>

        <h3 className="font-bold text-neutral-gray8 mb-3">تراکنش‌ها</h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between bg-white border border-neutral-gray2 rounded-xl p-4"
            >
              <div>
                <p className="font-medium text-neutral-gray8 text-sm">{tx.type}</p>
                <p className="text-xs text-neutral-gray6">{tx.date}</p>
              </div>
              <p className={`font-bold text-sm ${tx.amount > 0 ? 'text-status-success' : 'text-neutral-gray8'}`}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('fa-IR')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
