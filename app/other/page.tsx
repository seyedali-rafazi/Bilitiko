import type { Metadata } from 'next';
import Link from 'next/link';
import { FaHotel, FaCar, FaTrain, FaShip, FaUmbrellaBeach, FaQuestionCircle } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import Card from '@/components/ui/Card';
import { constructMetadata } from '@/lib/seo/metadata';
import { getBreadcrumbSchema } from '@/lib/seo/structured-data';
import StructuredData from '@/components/seo/StructuredData';

export const metadata: Metadata = constructMetadata({
  title: 'سایر خدمات سفر | هتل، تور، اجاره خودرو و خدمات فرودگاهی',
  description: 'مجموعه کامل خدمات گردشگری بیلیتیکو شامل رزرو هتل، تورهای مسافرتی داخلی و بین‌المللی، اجاره خودرو و خدمات ویژه مسافران.',
  path: '/other',
  keywords: ['رزرو هتل', 'تور مسافرتی', 'اجاره خودرو', 'خدمات سفر', 'بیلیتیکو'],
});

const services = [
  { title: 'هتل', desc: 'رزرو هتل در سراسر جهان', icon: FaHotel, href: '/other', color: 'text-blue-600' },
  { title: 'اجاره خودرو', desc: 'رزرو خودرو در مقصد', icon: FaCar, href: '/other', color: 'text-green-600' },
  { title: 'قطار', desc: 'بلیط قطار داخلی', icon: FaTrain, href: '/train', color: 'text-orange-600' },
  { title: 'کشتی', desc: 'تورهای دریایی', icon: FaShip, href: '/other', color: 'text-cyan-600' },
  { title: 'تور مسافرتی', desc: 'پکیج‌های تور داخلی و خارجی', icon: FaUmbrellaBeach, href: '/other', color: 'text-purple-600' },
  { title: 'پشتیبانی', desc: 'راهنمایی و پشتیبانی', icon: FaQuestionCircle, href: '/contact', color: 'text-primary-blue' },
];

export default function OtherPage() {
  const breadcrumbs = getBreadcrumbSchema([
    { name: 'صفحه اصلی', item: '/' },
    { name: 'سایر خدمات', item: '/other' },
  ]);

  return (
    <PageLayout>
      <StructuredData data={breadcrumbs} />
      <Hero title="سایر خدمات" subtitle="خدمات متنوع سفر با بیلیتیکو" height="h-[240px]" />

      <div className="container mx-auto px-4 py-12 max-w-[1224px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.href}>
              <Card hover padding="lg" className="h-full">
                <service.icon className={`text-4xl ${service.color} mb-4`} />
                <h2 className="text-xl font-bold text-neutral-gray8 mb-2">{service.title}</h2>
                <p className="text-neutral-gray6">{service.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
