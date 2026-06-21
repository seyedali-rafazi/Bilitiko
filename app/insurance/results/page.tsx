'use client';

import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/components/ui/Button';

const results = [
  { id: 1, name: 'بیمه سامان', price: 280000, coverage: '۳۰,۰۰۰ یورو', rating: 4.5 },
  { id: 2, name: 'بیمه ایران', price: 320000, coverage: '۵۰,۰۰۰ یورو', rating: 4.8 },
  { id: 3, name: 'بیمه آسیا', price: 250000, coverage: '۲۰,۰۰۰ یورو', rating: 4.2 },
];

export default function InsuranceResultsPage() {
  return (
    <PageLayout showFooter={false} mobileTitle="نتایج بیمه">
      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        {results.map((item) => (
          <div key={item.id} className="bg-white border border-neutral-gray2 rounded-xl p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-neutral-gray8">{item.name}</h3>
                <p className="text-xs text-neutral-gray6">پوشش {item.coverage}</p>
              </div>
              <span className="text-xs bg-status-warningBg text-status-warning px-2 py-1 rounded">
                ⭐ {item.rating}
              </span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-neutral-gray2">
              <span className="font-bold text-primary-blue">
                {item.price.toLocaleString('fa-IR')} تومان
              </span>
              <Link href={`/insurance/booking?plan=gold&provider=${item.id}`}>
                <Button size="sm">انتخاب</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
