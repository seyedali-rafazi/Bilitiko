'use client';

import TransportFiltersContent, { type TransportFiltersContentProps } from '@/components/transport/TransportFiltersContent';

type TransportFiltersSidebarProps = TransportFiltersContentProps;

export default function TransportFiltersSidebar(props: TransportFiltersSidebarProps) {
  return (
    <aside className="hidden lg:block w-[20%] shrink-0">
      <div className="sticky top-4">
        <TransportFiltersContent {...props} />
      </div>
    </aside>
  );
}

