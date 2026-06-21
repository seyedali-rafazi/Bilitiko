import Link from 'next/link';
import { FaHotel, FaCar, FaTrain, FaShip, FaUmbrellaBeach, FaQuestionCircle } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import Card from '@/components/ui/Card';

const services = [
  { title: 'هتل', desc: 'رزرو هتل در سراسر جهان', icon: FaHotel, href: '/other', color: 'text-blue-600' },
  { title: 'اجاره خودرو', desc: 'رزرو خودرو در مقصد', icon: FaCar, href: '/other', color: 'text-green-600' },
  { title: 'قطار', desc: 'بلیط قطار داخلی', icon: FaTrain, href: '/train', color: 'text-orange-600' },
  { title: 'کشتی', desc: 'تورهای دریایی', icon: FaShip, href: '/other', color: 'text-cyan-600' },
  { title: 'تور مسافرتی', desc: 'پکیج‌های تور داخلی و خارجی', icon: FaUmbrellaBeach, href: '/other', color: 'text-purple-600' },
  { title: 'پشتیبانی', desc: 'راهنمایی و پشتیبانی', icon: FaQuestionCircle, href: '/contact', color: 'text-primary-blue' },
];

export default function OtherPage() {
  return (
    <PageLayout>
      <Hero title="سایر خدمات" subtitle="خدمات متنوع سفر با بیلیتو" height="h-[240px]" />

      <div className="container mx-auto px-4 py-12 max-w-[1224px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link key={service.title} href={service.href}>
              <Card hover padding="lg" className="h-full">
                <service.icon className={`text-4xl ${service.color} mb-4`} />
                <h3 className="text-xl font-bold text-neutral-gray8 mb-2">{service.title}</h3>
                <p className="text-neutral-gray6">{service.desc}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
