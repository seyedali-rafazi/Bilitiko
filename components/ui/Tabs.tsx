'use client';

import { Tabs as ShadTabs, TabsList, TabsTrigger } from '@/components/ui/shadcn/tabs';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export default function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <ShadTabs value={activeTab} onValueChange={onChange} className={className}>
      <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto bg-transparent p-0 scrollbar-hide">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className={cn(
              'gap-2 rounded-none border-b-2 border-transparent bg-transparent px-2 pb-2 shadow-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none'
            )}
          >
            <span>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>
    </ShadTabs>
  );
}
