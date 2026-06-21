import { cn } from '@/lib/utils';

interface PaymentMethodIconProps {
  type: 'card' | 'wallet';
  active?: boolean;
  size?: 'sm' | 'md';
}

export default function PaymentMethodIcon({ type, active = false, size = 'md' }: PaymentMethodIconProps) {
  const dimensions = size === 'sm' ? 'w-12 h-12' : 'w-14 h-14';

  if (type === 'wallet') {
    return (
      <div
        className={cn(
          'neon-icon neon-icon-wallet relative flex items-center justify-center rounded-2xl shrink-0',
          dimensions,
          active && 'neon-icon-active'
        )}
        aria-hidden
      >
        <div className="neon-wallet-body" />
        <div className="neon-wallet-flap" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'neon-icon neon-icon-card relative flex items-center justify-center rounded-2xl shrink-0',
        dimensions,
        active && 'neon-icon-active'
      )}
      aria-hidden
    >
      <div className="neon-card-body">
        <div className="neon-card-chip" />
        <div className="neon-card-stripe" />
        <div className="neon-card-line" />
        <div className="neon-card-line short" />
      </div>
    </div>
  );
}
