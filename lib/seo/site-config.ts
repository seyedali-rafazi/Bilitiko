/**
 * Bilitiko Site SEO Configuration
 */
export const siteConfig = {
  name: 'بیلیتیکو',
  shortName: 'Bilitiko',
  domain: process.env.NEXT_PUBLIC_SITE_URL || 'https://bilitiko.com',
  defaultTitle: 'بیلیتیکو | رزرو آنلاین بلیط هواپیما، قطار، اتوبوس و بیمه مسافرتی',
  titleTemplate: '%s | بیلیتیکو',
  defaultDescription:
    'خرید و رزرو آنلاین بلیط هواپیما داخلی و خارجی، بلیط قطار، اتوبوس و بیمه مسافرتی با بهترین قیمت، پشتیبانی ۲۴ ساعته و استرداد آنی.',
  locale: 'fa_IR',
  type: 'website',
  ogImage: '/airplane.webp',
  contact: {
    phone: '021-4045',
    tel: '0214045',
    email: 'support@bilito.ir',
    address: 'تهران، میدان آزادی، خیابان آزادی، خیابان جیحون، طوس غربی',
    city: 'تهران',
    country: 'IR',
  },
  social: {
    telegram: 'https://t.me/bilitiko',
    instagram: 'https://instagram.com/bilitiko',
    twitter: 'https://twitter.com/bilitiko',
    linkedin: 'https://linkedin.com/company/bilitiko',
  },
};
