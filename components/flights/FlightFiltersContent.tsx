'use client';

import { Plane } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shadcn/card';
import { Checkbox } from '@/components/ui/shadcn/checkbox';
import { Label } from '@/components/ui/shadcn/label';
import { Separator } from '@/components/ui/shadcn/separator';
import { Slider } from '@/components/ui/shadcn/slider';
import type { Flight } from '@/lib/types';
import {
  getUniqueAirlines,
  STOP_OPTIONS,
  buildPriceHistogram,
  formatPriceFull,
  formatPriceShort,
  getPriceBounds,
  getStopsLabel,
} from '@/lib/flight-utils';

export interface FlightFiltersContentProps {
  flights: Flight[];
  filteredCount: number;
  selectedAirlines: string[];
  selectedStops: number[];
  priceRange: [number, number];
  departureDate: string | null;
  onAirlineToggle: (airline: string) => void;
  onStopsToggle: (stops: number) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  compact?: boolean;
}

export default function FlightFiltersContent({
  flights,
  filteredCount,
  selectedAirlines,
  selectedStops,
  priceRange,
  departureDate,
  onAirlineToggle,
  onStopsToggle,
  onPriceRangeChange,
  compact = false,
}: FlightFiltersContentProps) {
  const { min, max } = getPriceBounds(flights);
  const histogram = buildPriceHistogram(flights);
  const maxBar = Math.max(...histogram, 1);
  const idPrefix = compact ? 'mobile' : 'desktop';

  return (
    <div className={compact ? 'space-y-4' : 'space-y-4'}>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Plane className="h-4 w-4 text-primary" />
            پروازهای موجود
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold text-primary">{filteredCount.toLocaleString('fa-IR')}</p>
          <p className="text-xs text-muted-foreground">از {flights.length.toLocaleString('fa-IR')} پرواز</p>
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
          step={50000}
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
        <FilterSection title="تاریخ پرواز">
          <div className="rounded-lg bg-secondary p-3 text-center">
            <p className="text-sm font-bold ltr-input">{departureDate}</p>
          </div>
        </FilterSection>
      )}

      <FilterSection title="ایرلاین">
        <div className="space-y-3">
          {getUniqueAirlines(flights).map((airline) => {
            const count = flights.filter((f) => f.airline === airline).length;
            const id = `${idPrefix}-airline-${airline}`;
            return (
              <div key={airline} className="flex items-center gap-2">
                <Checkbox
                  id={id}
                  checked={selectedAirlines.includes(airline)}
                  onCheckedChange={() => onAirlineToggle(airline)}
                />
                <Label htmlFor={id} className="flex-1 cursor-pointer text-sm font-normal">
                  {airline}
                </Label>
                <span className="text-xs text-muted-foreground">{count.toLocaleString('fa-IR')}</span>
              </div>
            );
          })}
        </div>
      </FilterSection>

      <FilterSection title="توقف‌ها">
        <div className="space-y-3">
          {stopOptions(flights).map(({ value, label, count }) => {
            const id = `${idPrefix}-stops-${value}`;
            return (
              <div key={value} className="flex items-center gap-2">
                <Checkbox
                  id={id}
                  checked={selectedStops.includes(value)}
                  onCheckedChange={() => onStopsToggle(value)}
                />
                <Label htmlFor={id} className="flex-1 cursor-pointer text-sm font-normal">
                  {label}
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

function stopOptions(flights: Flight[]) {
  return STOP_OPTIONS.map((opt) => ({
    ...opt,
    label: getStopsLabel(opt.value),
    count: flights.filter((f) => f.stops === opt.value).length,
  })).filter((opt) => opt.count > 0);
}
