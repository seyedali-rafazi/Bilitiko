import { ReactNode } from 'react';
import { Card as ShadCard } from '@/components/ui/shadcn/card';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingMap = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({ children, className, hover = false, padding = 'md' }: CardProps) {
  return (
    <ShadCard
      className={cn(
        paddingMap[padding],
        hover && 'card-hover cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        className
      )}
    >
      {children}
    </ShadCard>
  );
}
