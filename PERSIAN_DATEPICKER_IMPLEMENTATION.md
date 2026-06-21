# Persian Date Picker Implementation

## Overview
Implemented a fully functional Persian (Jalali) date picker component across the entire project, replacing all standard HTML date inputs with a custom Persian calendar interface.

## Component Created

### `components/ui/PersianDatePicker.tsx`
A reusable, feature-rich Persian date picker component with:

#### Features
- ✅ **Persian Calendar Display** - Shows Jalali months and dates
- ✅ **Persian Month Names** - فروردین, اردیبهشت, خرداد, etc.
- ✅ **Persian Weekday Headers** - ش, ی, د, س, چ, پ, ج
- ✅ **Date Navigation** - Previous/next month buttons
- ✅ **Today Highlight** - Current date marked with border
- ✅ **Selected Date** - Highlighted in blue
- ✅ **Min/Max Date Validation** - Restrict selectable dates
- ✅ **Click Outside to Close** - Auto-close on outside click
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **Persian Number Display** - All numbers in Persian format
- ✅ **Today Button** - Quick select today's date
- ✅ **Disabled Dates** - Visual indication for non-selectable dates
- ✅ **Accessible** - Proper labels and keyboard support

#### Props
```typescript
interface PersianDatePickerProps {
  value: string;              // ISO format (YYYY-MM-DD)
  onChange: (value: string) => void;
  label?: string;             // Field label
  placeholder?: string;       // Placeholder text
  required?: boolean;         // Required field indicator
  minDate?: string;          // Minimum selectable date (ISO)
  maxDate?: string;          // Maximum selectable date (ISO)
  className?: string;        // Additional CSS classes
}
```

#### Technical Details
- Uses `date-fns-jalali` for Persian date conversion
- Stores dates in ISO format (YYYY-MM-DD) for consistency
- Displays dates in Persian format (yyyy/MM/dd)
- Handles month navigation with proper date calculations
- Adjusts week start to Saturday (Persian calendar standard)

## Files Updated

### 1. **components/home/FlightSearchBox.tsx**
- Replaced departure date input with PersianDatePicker
- Replaced return date input with PersianDatePicker
- Added minDate validation for return date

### 2. **components/mobile/MobileSearchBox.tsx**
- Replaced departure date input with PersianDatePicker
- Replaced return date input with PersianDatePicker
- Added minDate validation for return date

### 3. **components/search/TripSearchBox.tsx**
- Replaced departure date input with PersianDatePicker
- Replaced return date input with PersianDatePicker
- Added minDate validation for return date

### 4. **components/search/MobileTripSearchBox.tsx**
- Replaced departure date input with PersianDatePicker
- Replaced return date input with PersianDatePicker
- Added minDate validation for return date

### 5. **components/booking/PassengerForm.tsx**
- Replaced birth date input with PersianDatePicker
- Added maxDate validation (cannot select future dates)

### 6. **app/insurance/booking/page.tsx**
- Replaced birth date input with PersianDatePicker
- Replaced coverage start date input with PersianDatePicker
- Replaced coverage end date input with PersianDatePicker
- Added date range validation (end date must be after start date)

## Usage Examples

### Basic Usage
```tsx
<PersianDatePicker
  value={date}
  onChange={setDate}
  label="تاریخ"
  required
/>
```

### With Min/Max Dates
```tsx
<PersianDatePicker
  value={birthDate}
  onChange={setBirthDate}
  label="تاریخ تولد"
  maxDate={new Date().toISOString().split('T')[0]}
  required
/>
```

### Date Range (Start/End)
```tsx
<PersianDatePicker
  label="تاریخ شروع"
  value={startDate}
  onChange={setStartDate}
  required
/>

<PersianDatePicker
  label="تاریخ پایان"
  value={endDate}
  onChange={setEndDate}
  minDate={startDate}
  required
/>
```

## UI/UX Features

### Visual Design
- Clean, modern interface matching project design system
- Smooth hover effects on dates
- Clear visual distinction between:
  - Today's date (border highlight)
  - Selected date (blue background)
  - Disabled dates (grayed out)
  - Hover state (light blue background)

### Interaction
- Click input field to open calendar
- Click outside to close
- Navigate months with arrow buttons
- Click "امروز" button to select today
- Click any enabled date to select

### Responsive Behavior
- Full-width on mobile devices
- Proper spacing and touch targets
- Dropdown positioning adjusts to viewport

## Date Format Handling

### Storage Format
All dates are stored in **ISO 8601 format** (YYYY-MM-DD):
- Example: `2024-03-15`
- Ensures consistency across the application
- Compatible with backend APIs
- Easy to compare and validate

### Display Format
Dates are displayed in **Persian format** (yyyy/MM/dd):
- Example: `1403/12/25`
- Uses Persian numerals (۱۴۰۳/۱۲/۲۵)
- Familiar format for Persian users

### Conversion
The component handles all conversions automatically:
```typescript
// Input: ISO date string
value="2024-03-15"

// Display: Persian format
"1403/12/25"

// Output: ISO date string
onChange("2024-03-15")
```

## Validation Features

### Min Date Validation
Prevents selection of dates before a specified date:
```tsx
<PersianDatePicker
  minDate={departureDate}
  // User cannot select dates before departure
/>
```

### Max Date Validation
Prevents selection of dates after a specified date:
```tsx
<PersianDatePicker
  maxDate={new Date().toISOString().split('T')[0]}
  // User cannot select future dates
/>
```

### Required Field
Shows asterisk (*) indicator for required fields:
```tsx
<PersianDatePicker
  required
  // Shows red asterisk next to label
/>
```

## Accessibility

### Keyboard Support
- Tab navigation between fields
- Enter to open/close calendar
- Arrow keys for date navigation (future enhancement)

### Screen Readers
- Proper label associations
- ARIA attributes for calendar
- Semantic HTML structure

### Visual Indicators
- Clear focus states
- High contrast for readability
- Large touch targets (mobile)

## Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

### Optimizations
- Memoized date calculations
- Efficient re-rendering
- Lazy calendar generation
- Click outside handler cleanup

### Bundle Size
- Uses existing `date-fns-jalali` dependency
- No additional libraries required
- Minimal CSS overhead

## Future Enhancements

Potential improvements:
- [ ] Keyboard navigation within calendar
- [ ] Date range selection (select start and end in one picker)
- [ ] Time picker integration
- [ ] Custom date formats
- [ ] Locale switching
- [ ] Animation transitions
- [ ] Year/month quick select dropdown
- [ ] Multiple date selection
- [ ] Preset date ranges (last week, last month, etc.)

## Migration Notes

### Before (Standard HTML Input)
```tsx
<input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  className="..."
/>
```

### After (Persian Date Picker)
```tsx
<PersianDatePicker
  value={date}
  onChange={setDate}
  label="تاریخ"
/>
```

### Breaking Changes
None - the component maintains the same data format (ISO strings)

## Testing Checklist

- [x] Date selection works correctly
- [x] Min/Max date validation works
- [x] Today button selects current date
- [x] Month navigation works
- [x] Click outside closes calendar
- [x] Persian numbers display correctly
- [x] Responsive on mobile devices
- [x] Works with form validation
- [x] Disabled dates are not selectable
- [x] Selected date is highlighted
- [x] Today's date is marked

## Support

For issues or questions:
1. Check component props documentation
2. Verify date format (must be ISO: YYYY-MM-DD)
3. Ensure `date-fns-jalali` is installed
4. Check browser console for errors

## Summary

Successfully replaced all date inputs across the project with a custom Persian date picker, providing a native Persian calendar experience for users while maintaining data consistency and compatibility with the existing codebase.