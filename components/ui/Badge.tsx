import { Badge as ShadBadge } from '@/components/ui/shadcn/badge';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'neutral';
  className?: string;
}

const variantMap = {
  primary: 'default' as const,
  success: 'success' as const,
  warning: 'warning' as const,
  neutral: 'neutral' as const,
};

export default function Badge({ children, variant = 'neutral', className }: BadgeProps) {
  return (
    <ShadBadge variant={variantMap[variant]} className={cn('gap-1 px-3 py-1 text-sm', className)}>
      {children}
    </ShadBadge>
  );
}
