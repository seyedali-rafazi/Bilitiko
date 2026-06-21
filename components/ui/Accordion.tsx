'use client';

import {
  Accordion as ShadAccordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/shadcn/accordion';
import type { FAQ } from '@/lib/types';

interface AccordionProps {
  items: FAQ[];
  defaultOpen?: number;
}

export default function Accordion({ items, defaultOpen = 0 }: AccordionProps) {
  const defaultValue = defaultOpen >= 0 ? `item-${defaultOpen}` : undefined;

  return (
    <ShadAccordion
      type="single"
      collapsible
      defaultValue={defaultValue}
      className="rounded-lg border bg-card"
    >
      {items.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="px-4">
          <AccordionTrigger className="text-base font-semibold text-neutral-gray8 hover:text-primary hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground leading-relaxed">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </ShadAccordion>
  );
}
