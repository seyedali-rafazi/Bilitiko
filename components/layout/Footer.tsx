import Link from 'next/link';
import { FaPlane, FaApple, FaGooglePlay, FaInstagram, FaTelegram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { FOOTER_LINKS } from '@/lib/constants';

const SOCIAL_LINKS = [
  { icon: FaTelegram, href: 'https://t.me', label: 'تلگرام' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'اینستاگرام' },
  { icon: FaTwitter, href: 'https://twitter.com', label: 'توییتر' },
  { icon: FaLinkedin, href: 'https://linkedin.com', label: 'لینکدین' },
];

export default function Footer() {
  return (
    <footer className="bg-neutral-gray1 py-8 lg:py-12 border-t border-neutral-gray2 mt-auto">
      <div className="container mx-auto px-4 max-w-[1224px]">
        <div className="hidden lg:grid grid-cols-3 gap-12 mb-12">
          <div className="text-right">
            <div className="flex items-center gap-3 mb-4 justify-start">
              <div className="bg-gradient-to-br from-primary-blue to-primary-shade1 p-2 rounded-lg">
                <FaPlane className="text-white text-xl -rotate-45" />
              </div>
              <span className="text-2xl font-bold text-primary-blue">بیلیتیکو</span>
            </div>
            <p className="text-base text-neutral-gray7 mb-4 leading-relaxed">
              تلفن پشتیبانی:{' '}
              <a href="tel:0214045" className="text-primary-blue font-bold hover:underline">
                021-4045
              </a>
            </p>
            <p className="text-base text-neutral-gray7 leading-relaxed">
              آدرس دفتر مرکزی: تهران، میدان آزادی، خیابان آزادی، خیابان جیحون، طوس غربی.
            </p>
          </div>

          <div className="text-right">
            <h3 className="text-xl font-bold text-neutral-gray7 mb-4 pb-2 border-b border-neutral-gray2">
              میانبر
            </h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-base text-neutral-gray7 hover:text-primary-blue transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-right">
            <h3 className="text-xl font-bold text-neutral-gray8 mb-4">اپلیکیشن بیلیتیکو</h3>
            <p className="text-base text-neutral-gray7 mb-6 leading-relaxed">
              با نصب اپلیکیشن بیلیتیکو راحتی و سرعت در رزرو بلیط هواپیما را داشته باشید.
            </p>
            <div className="flex gap-3">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary-shade2 hover:bg-primary-shade3 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors"
              >
                <FaApple className="text-xl" />
                <span className="text-sm font-bold">App Store</span>
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary-shade2 hover:bg-primary-shade3 text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 transition-colors"
              >
                <FaGooglePlay className="text-lg" />
                <span className="text-sm font-bold">Play Store</span>
              </a>
            </div>
          </div>
        </div>

        <div className="lg:hidden text-center py-4 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <FaPlane className="text-primary-blue -rotate-45" />
            <span className="font-bold text-primary-blue">بیلیتیکو</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {FOOTER_LINKS.slice(0, 3).map((item) => (
              <Link key={item.href} href={item.href} className="text-xs text-neutral-gray6 hover:text-primary-blue">
                {item.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-neutral-gray6">
            پشتیبانی:{' '}
            <a href="tel:0214045" className="text-primary-blue">021-4045</a>
          </p>
          <p className="text-xs text-neutral-gray5">© بیلیتیکو - رزرو بلیط هواپیما</p>
        </div>

        <div className="hidden lg:flex flex-col md:flex-row items-center justify-between pt-8 border-t border-neutral-gray2 gap-4">
          <p className="text-sm text-neutral-gray6">© ۱۴۰۵ بیلیتیکو - تمامی حقوق محفوظ است</p>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full bg-white border border-neutral-gray3 flex items-center justify-center text-neutral-gray6 hover:text-primary-blue hover:border-primary-blue transition-colors"
              >
                <Icon className="text-lg" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
