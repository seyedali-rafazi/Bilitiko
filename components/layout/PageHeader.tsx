import { ReactNode } from 'react';
import clsx from 'clsx';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export default function PageHeader({ title, subtitle, children, className }: PageHeaderProps) {
  return (
    <div className={clsx('container mx-auto px-4 py-8 max-w-[1224px]', className)}>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-gray8 mb-3">{title}</h1>
        {subtitle && <p className="text-neutral-gray6 text-lg">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
