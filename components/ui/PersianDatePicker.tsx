'use client';

import { useState, useRef, useEffect } from 'react';
import { format as formatJalali, parse as parseJalali } from 'date-fns-jalali';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { cn } from '@/lib/utils';

interface PersianDatePickerProps {
  value: string; // ISO format (YYYY-MM-DD)
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  minDate?: string;
  maxDate?: string;
  className?: string;
}

const PERSIAN_MONTHS = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
];

const PERSIAN_WEEKDAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

export default function PersianDatePicker({
  value,
  onChange,
  label,
  placeholder = 'انتخاب تاریخ',
  required = false,
  minDate,
  maxDate,
  className,
}: PersianDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  // Convert ISO date to Persian display
  const getDisplayValue = () => {
    if (!value) return '';
    try {
      const date = new Date(value);
      return formatJalali(date, 'yyyy/MM/dd');
    } catch {
      return '';
    }
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Initialize display month from value
  useEffect(() => {
    if (value) {
      try {
        const date = new Date(value);
        setDisplayMonth(date);
      } catch {
        // Invalid date, keep current month
      }
    }
  }, [value]);

  const handleDateSelect = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    onChange(`${year}-${month}-${day}`);
    setIsOpen(false);
  };

  const changeMonth = (delta: number) => {
    const newDate = new Date(displayMonth);
    newDate.setMonth(newDate.getMonth() + delta);
    setDisplayMonth(newDate);
  };

  const getDaysInMonth = () => {
    const year = displayMonth.getFullYear();
    const month = displayMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startWeekday = firstDay.getDay(); // 0 = Sunday

    const days: (Date | null)[] = [];
    
    // Add empty cells for days before month starts
    // Adjust for Persian week (Saturday = 0)
    const adjustedStart = (startWeekday + 1) % 7;
    for (let i = 0; i < adjustedStart; i++) {
      days.push(null);
    }

    // Add all days in month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isDateDisabled = (date: Date) => {
    const dateStr = format(date);
    if (minDate && dateStr < minDate) return true;
    if (maxDate && dateStr > maxDate) return true;
    return false;
  };

  const isDateSelected = (date: Date) => {
    if (!value) return false;
    return format(date) === value;
  };

  const format = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const days = getDaysInMonth();
  const displayValue = getDisplayValue();

  // Get Persian month and year for display
  const getPersianMonthYear = () => {
    try {
      const jalaliDate = formatJalali(displayMonth, 'yyyy MMMM', { locale: undefined });
      return jalaliDate;
    } catch {
      return '';
    }
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {label && (
        <label className="block text-sm font-medium text-neutral-gray8 mb-1.5">
          {label}
          {required && <span className="text-status-error mr-1">*</span>}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full h-12 px-4 flex items-center justify-between',
          'bg-white border border-neutral-gray3 rounded-lg',
          'text-right text-sm transition-colors',
          'hover:border-primary-blue focus:outline-none focus:ring-2 focus:ring-primary-blue/20',
          !displayValue && 'text-neutral-gray5'
        )}
      >
        <span>{displayValue || placeholder}</span>
        <FaCalendarAlt className="text-neutral-gray5" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-neutral-gray3 rounded-xl shadow-lg z-50 p-4">
          {/* Month/Year Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => changeMonth(1)}
              className="p-2 hover:bg-neutral-gray1 rounded-lg transition-colors"
            >
              <FaChevronLeft className="text-neutral-gray6" />
            </button>
            
            <div className="text-sm font-bold text-neutral-gray8">
              {getPersianMonthYear()}
            </div>
            
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              className="p-2 hover:bg-neutral-gray1 rounded-lg transition-colors"
            >
              <FaChevronRight className="text-neutral-gray6" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {PERSIAN_WEEKDAYS.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-neutral-gray6 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="aspect-square" />;
              }

              const disabled = isDateDisabled(date);
              const selected = isDateSelected(date);
              const isToday = format(date) === format(new Date());

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => !disabled && handleDateSelect(date)}
                  disabled={disabled}
                  className={cn(
                    'aspect-square flex items-center justify-center rounded-lg text-sm transition-colors',
                    disabled && 'text-neutral-gray4 cursor-not-allowed',
                    !disabled && !selected && 'hover:bg-primary-tint1 text-neutral-gray8',
                    selected && 'bg-primary-blue text-white font-bold',
                    isToday && !selected && 'border border-primary-blue'
                  )}
                >
                  {formatJalali(date, 'd')}
                </button>
              );
            })}
          </div>

          {/* Today Button */}
          <button
            type="button"
            onClick={() => handleDateSelect(new Date())}
            className="w-full mt-4 py-2 text-sm text-primary-blue hover:bg-primary-tint1 rounded-lg transition-colors"
          >
            امروز
          </button>
        </div>
      )}
    </div>
  );
}

// Made with Bob
