'use client';

import { Bus, Train } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { Checkbox } from '@/components/ui/shadcn/checkbox';
import { Label } from '@/components/ui/shadcn/label';
import { Separator } from '@/components/ui/shadcn/separator';
import { Slider } from '@/components/ui/shadcn/slider';
import type { TransportTrip } from '@/lib/transport-utils';
import {
  buildPriceHistogram,
  formatPriceFull,
  formatPriceShort,
  getPriceBounds,
} from '@/lib/transport-utils';

export interface TransportFiltersContentProps {
  trips: TransportTrip[];
  filteredCount: number;
  selectedCompanies: string[];
  priceRange: [number, number];
  departureDate: string | null;
  onCompanyToggle: (company: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  compact?: boolean;
  type: 'bus' | 'train';
  companies: string[];
}

export default function TransportFiltersContent({
  trips,
  filteredCount,
  selectedCompanies,
  priceRange,
  departureDate,
  onCompanyToggle,
  onPriceRangeChange,
  compact = false,
  type,
  companies,
}: TransportFiltersContentProps) {
  const { min, max } = getPriceBounds(trips);
  const histogram = buildPriceHistogram(trips);
  const maxBar = Math.max(...histogram, 1);
  const idPrefix = compact ? 'mobile' : 'desktop';
  const Icon = type === 'bus' ? Bus : Train;
  const label = type === 'bus' ? 'اتوبوس' : 'قطار';

  return (
    <div className={compact ? 'space-y-4' : 'space-y-4'}>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Icon className="h-4 w-4 text-primary" />
            {label}های موجود
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-primary">{filteredCount.toLocaleString('fa-IR')}</p>
          <p className="text-xs text-muted-foreground">از {trips.length.toLocaleString('fa-IR')} سرویس</p>
        </CardContent>
      </Card>

      <FilterSection title="محدوده قیمت">
        <div className="flex items-end justify-between gap-1 h-16 mb-4">
          {histogram.map((count, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-primary/15 transition-all"
              style={{
                height: `${(count / maxBar) * 100}%`,
                minHeight: count > 0 ? '8px' : '2px',
                opacity: count > 0 ? 1 : 0.3,
              }}
            />
          ))}
        </div>
        <Slider
          min={min}
          max={max}
          step={10000}
          value={priceRange}
          onValueChange={(value) => onPriceRangeChange(value as [number, number])}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-3">
          <span>{formatPriceShort(priceRange[0])}</span>
          <span>{formatPriceShort(priceRange[1])}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1 text-center">
          {formatPriceFull(priceRange[0])} – {formatPriceFull(priceRange[1])} تومان
        </p>
      </FilterSection>

      {departureDate && (
        <FilterSection title="تاریخ حرکت">
          <div className="rounded-lg bg-secondary p-3 text-center">
            <p className="text-sm font-bold ltr-input">{departureDate}</p>
          </div>
        </FilterSection>
      )}

      <FilterSection title="شرکت">
        <div className="space-y-3">
          {companies.map((company) => {
            const count = trips.filter((t) => t.company === company).length;
            const id = `${idPrefix}-company-${company}`;
            return (
              <div key={company} className="flex items-center gap-2">
                <Checkbox
                  id={id}
                  checked={selectedCompanies.includes(company)}
                  onCheckedChange={() => onCompanyToggle(company)}
                />
                <Label htmlFor={id} className="flex-1 cursor-pointer text-sm font-normal">
                  {company}
                </Label>
                <span className="text-xs text-muted-foreground">{count.toLocaleString('fa-IR')}</span>
              </div>
            );
          })}
        </div>
      </FilterSection>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">{title}</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

