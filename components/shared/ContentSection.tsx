import { ReactNode } from 'react';
import Card from '@/components/ui/Card';

interface ContentSectionProps {
  title: string;
  children: ReactNode;
}

export default function ContentSection({ title, children }: ContentSectionProps) {
  return (
    <Card className="mb-6" padding="lg">
      <h2 className="text-xl font-bold text-neutral-gray8 mb-4 pb-2 border-b border-neutral-gray2">
        {title}
      </h2>
      <div className="text-neutral-gray7 leading-relaxed space-y-4">{children}</div>
    </Card>
  );
}
