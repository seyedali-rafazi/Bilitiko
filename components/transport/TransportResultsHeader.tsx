'use client';

import { Label } from '@/components/ui/shadcn/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/shadcn/select';
import { Button } from '@/components/ui/shadcn/button';
import { cn } from '@/lib/utils';
import { SORT_OPTIONS, buildDatePriceStrip, formatDateLabel, formatPriceShort } from '@/lib/transport-utils';

interface TransportResultsHeaderProps {
  sort: string;
  onSortChange: (sort: string) => void;
  departureDate: string | null;
  basePrice: number;
  onDateSelect: (date: string) => void;
}

export default function TransportResultsHeader({
  sort,
  onSortChange,
  departureDate,
  basePrice,
  onDateSelect,
}: TransportResultsHeaderProps) {
  const dateStrip = buildDatePriceStrip(departureDate, basePrice);

  return (
    <div className="hidden lg:flex items-stretch gap-3 mb-4">
      <div className="w-[20%] shrink-0 space-y-1.5">
        <Label className="text-xs text-muted-foreground">مرتب‌سازی</Label>
        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger>
            <SelectValue placeholder="مرتب‌سازی" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.id} value={opt.id}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-[80%] space-y-1.5">
        <Label className="text-xs text-muted-foreground">قیمت بر اساس تاریخ</Label>
        <div className="flex gap-2 overflow-x-auto">
          {dateStrip.map(({ date, price, isCenter }) => {
            const { day, month, weekday } = formatDateLabel(date);
            return (
              <Button
                key={date}
                type="button"
                variant={isCenter ? 'default' : 'outline'}
                onClick={() => onDateSelect(date)}
                className={cn(
                  'h-auto min-w-[72px] flex-1 flex-col gap-0.5 py-2 px-1',
                  !isCenter && 'hover:bg-accent'
                )}
              >
                <span className={cn('text-[10px]', isCenter ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                  {weekday}
                </span>
                <span className="text-sm font-bold">{day}</span>
                <span className={cn('text-[10px]', isCenter ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                  {month}
                </span>
                <span className={cn('text-xs font-bold mt-0.5', !isCenter && 'text-primary')}>
                  {formatPriceShort(price)}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

