import Accordion from '@/components/ui/Accordion';
import { FAQS } from '@/lib/constants';

export default function FAQSection() {
  return (
    <div className="container mx-auto px-4 mb-12 max-w-[1224px]">
      <h2 className="text-xl font-bold text-neutral-gray8 mb-6">سوالات متداول</h2>
      <Accordion items={FAQS} />
    </div>
  );
}
