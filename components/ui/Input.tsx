import { forwardRef } from 'react';
import { Input as ShadInput } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';
import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<typeof ShadInput> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id || label;
    return (
      <div className="space-y-2">
        {label && (
          <Label htmlFor={inputId} className="font-bold text-neutral-gray8">
            {label}
          </Label>
        )}
        <ShadInput
          ref={ref}
          id={inputId}
          className={cn(error && 'border-destructive focus-visible:ring-destructive', className)}
          {...props}
        />
        {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
