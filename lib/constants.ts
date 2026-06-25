import type { City, FAQ, Destination, PopularFlight } from './types';

export const BANNER_IMAGES = {
  flight: '/airplane.webp',
  bus: '/bus.webp',
  train: '/train.webp',
} as const;

export const CITIES: City[] = [
  { code: 'THR', name: 'تهران' },
  { code: 'MHD', name: 'مشهد' },
  { code: 'IFN', name: 'اصفهان' },
  { code: 'SYZ', name: 'شیراز' },
  { code: 'TBZ', name: 'تبریز' },
  { code: 'KIH', name: 'کیش' },
  { code: 'DXB', name: 'دبی' },
  { code: 'IST', name: 'استانبول' },
];

/** Domestic cities available for bus and train — value is the Persian name
 *  (exactly as stored in the backend transport_trips collection). */
export const TRANSPORT_CITIES = [
  'تهران',
  'مشهد',
  'اصفهان',
  'شیراز',
] as const;

export const SEARCH_HISTORY = [
  'تهران به استانبول',
  'تهران به دبی',
  'تهران به شیراز',
  'شیراز به تهران',
  'شیراز به اصفهان',
  'تهران به استانبول',
];

export const POPULAR_FLIGHTS: PopularFlight[] = [
  { from: 'تهران', to: 'مشهد', fromCode: 'THR', toCode: 'MHD', price: '۱,۵۰۰,۰۰۰', image: '/flight-tehran-mashhad.svg' },
  { from: 'مشهد', to: 'تهران', fromCode: 'MHD', toCode: 'THR', price: '۱,۵۰۰,۰۰۰', image: '/flight-mashhad-tehran.svg' },
  { from: 'کیش', to: 'تهران', fromCode: 'KIH', toCode: 'THR', price: '۲,۵۰۰,۰۰۰', image: '/flight-kish-tehran.svg' },
  { from: 'تهران', to: 'شیراز', fromCode: 'THR', toCode: 'SYZ', price: '۱,۷۰۰,۰۰۰', image: '/flight-tehran-shiraz.svg' },
];

export const DESTINATIONS: Destination[] = [
  { title: 'بهترین فصل شنا', subtitle: 'خرید بلیط پرواز‌های کیش', image: '/kish.svg', destinationCode: 'KIH' },
  { title: 'سفر به ترکیه', subtitle: 'خرید بلیط پرواز‌های ترکیه', image: '/turkey.svg', destinationCode: 'IST' },
  { title: 'شگفتی در صحرا', subtitle: 'خرید بلیط پرواز‌های دبی', image: '/dubai.svg', destinationCode: 'DXB' },
];

export const FLIGHT_TYPE_OPTIONS = [
  { id: 'charter', label: 'چارتر' },
  { id: 'system', label: 'سیستمی' },
  { id: 'international', label: 'پرواز خارجی' },
] as const;

export const FAQS: FAQ[] = [
  {
    question: 'در هر پرواز میزان بار مجاز چقدر است؟',
    answer: 'بلیط تمام خطوط هوایی دنیا در سایت بیلیتیکو موجود است، چه پروازهایی که مبدا یا مقصد آنها ایران است و چه پروازهای داخلی دورترین کشورهای دنیا.',
  },
  {
    question: 'نرخ بلیط هواپیما برای نوزادان و کودکان زیر 12سال چگونه است؟',
    answer: 'نرخ بلیط برای کودکان زیر 2 سال معمولاً 10 درصد قیمت بلیط بزرگسال و برای کودکان 2 تا 12 سال حدود 75 درصد قیمت بلیط بزرگسال است.',
  },
  {
    question: 'آیا پس از خرید اینترنتی بلیط هواپیما امکان استرداد آن وجود دارد؟',
    answer: 'بله، امکان استرداد بلیط با توجه به قوانین هر ایرلاین وجود دارد.',
  },
  {
    question: 'آیا پس از خرید بلیط هواپیما امکان تغییر نام یا نام خانوادگی وجود دارد؟',
    answer: 'خیر، امکان تغییر نام در بلیط هواپیما وجود ندارد.',
  },
  {
    question: 'هنگامی که از سایت خرید بلیط هواپیما رزرو بلیط را انجام می‌دهیم امکان انتخاب صندلی مورد نظرمان وجود دارد؟',
    answer: 'بله، در بیشتر پروازها امکان انتخاب صندلی وجود دارد.',
  },
  {
    question: 'بلیط پرواز چه کشورها ایرلاین‌هایی را می‌توانم‌ در سایت بیلیتیکو جستجو و خریداری کنم؟',
    answer: 'تمام ایرلاین‌های داخلی و بین‌المللی در بیلیتیکو قابل جستجو و خرید هستند.',
  },
];

export const ADVANTAGES = [
  { title: 'کمترین نرخ خرید بلیط' },
  { title: 'خدمات آنلاین' },
  { title: 'پاسخگویی 24 ساعته' },
  { title: 'دسترسی آسان و راحت' },
];

export const FOOTER_LINKS = [
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '/contact' },
  { label: 'استرداد بلیط', href: '/refund' },
  { label: 'راهنمای خرید بلیط', href: '/guide' },
  { label: 'قوانین و مقررات', href: '/terms' },
];

export const NAV_LINKS = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'بلیط اتوبوس', href: '/bus' },
  { label: ' بلیط قطار', href: '/train' },
  { label: 'بیمه مسافرتی', href: '/insurance' },
  { label: 'سایر موارد', href: '/other' },
];

export function getClassLabel(classType: string | null): string {
  switch (classType) {
    case 'economy': return 'اقتصادی';
    case 'business': return 'بیزینس';
    case 'first': return 'فرست کلاس';
    default: return 'اقتصادی';
  }
}
