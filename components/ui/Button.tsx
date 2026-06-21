import { forwardRef } from 'react';
import { Button as ShadButton, type ButtonProps as ShadButtonProps } from '@/components/ui/shadcn/button';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ShadButtonProps, 'variant' | 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantMap: Record<ButtonVariant, ShadButtonProps['variant']> = {
  primary: 'default',
  secondary: 'secondary',
  outline: 'outline',
  ghost: 'ghost',
};

const sizeMap: Record<ButtonSize, ShadButtonProps['size']> = {
  sm: 'sm',
  md: 'default',
  lg: 'lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', fullWidth, className, ...props }, ref) => (
    <ShadButton
      ref={ref}
      variant={variantMap[variant]}
      size={sizeMap[size]}
      className={cn(fullWidth && 'w-full', className)}
      {...props}
    />
  )
);

Button.displayName = 'Button';
export default Button;
