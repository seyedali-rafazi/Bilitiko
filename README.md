# 🎫 بیلیتیکو - سیستم رزرو بلیط آنلاین

یک وب‌اپلیکیشن مدرن و حرفه‌ای برای رزرو آنلاین بلیط هواپیما، اتوبوس و قطار با استفاده از جدیدترین تکنولوژی‌ها

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

## 📋 فهرست مطالب

- [ویژگی‌های برجسته](#-ویژگیهای-برجسته)
- [نصب و راه‌اندازی](#-نصب-و-راهاندازی)
- [تکنولوژی‌ها](#️-تکنولوژیهای-استفاده-شده)
- [ساختار پروژه](#-ساختار-پروژه)
- [صفحات و قابلیت‌ها](#-صفحات-و-قابلیتها)
- [مستندات](#-مستندات)
- [دستورات](#-دستورات)

## ✨ ویژگی‌های برجسته

### 🎨 طراحی و رابط کاربری

- **طراحی مدرن و زیبا** با گرادیانت‌های جذاب و افکت‌های شیشه‌ای (Glass Morphism)
- **انیمیشن‌های روان** با Framer Motion و CSS Animations
- **کاملاً ریسپانسیو** برای موبایل، تبلت و دسکتاپ
- **پشتیبانی کامل RTL** برای زبان فارسی
- **تقویم شمسی** با date picker فارسی در تمام صفحات
- **تم رنگی حرفه‌ای** با آبی، بنفش و سبز
- **افکت‌های Hover** و تعاملات بصری جذاب

### 🚀 قابلیت‌های اصلی

#### ✈️ رزرو بلیط هواپیما
- جستجوی پیشرفته با فیلترهای متنوع
- نمایش پروازها با جزئیات کامل
- فیلتر بر اساس ایرلاین، قیمت، توقف
- مرتب‌سازی (ارزان‌ترین، زودترین، دیرترین)
- نوار تاریخ با نمایش قیمت 9 روز
- نمایش هیستوگرام قیمت

#### 🚌 رزرو بلیط اتوبوس
- جستجوی مسیرهای اتوبوسرانی
- فیلتر بر اساس شرکت و قیمت
- نمایش امکانات (VIP، Wi-Fi، پذیرایی)
- انتخاب تاریخ با تقویم فارسی

#### 🚆 رزرو بلیط قطار
- جستجوی مسیرهای ریلی
- فیلتر بر اساس شرکت و قیمت
- نمایش نوع کوپه و امکانات
- انتخاب تاریخ با تقویم فارسی

#### 🔐 احراز هویت
- سیستم ورود با شماره موبایل
- تأیید با کد OTP (کد تست: 11111)
- محافظت از صفحات با Auth Guard
- بازگشت به صفحه مقصد پس از ورود

#### 🗓️ تقویم شمسی
- Date Picker فارسی در تمام فرم‌ها
- نمایش ماه‌های شمسی
- هفته شروع از شنبه
- اعتبارسنجی تاریخ (min/max)
- دکمه انتخاب سریع "امروز"

### ⚡ قابلیت‌های پیشرفته

- 🔍 **جستجوی هوشمند** با اعتبارسنجی فیلدها
- 📊 **فیلترهای پیشرفته** با هیستوگرام قیمت
- 📱 **Bottom Sheet** برای موبایل
- 🎯 **تجربه کاربری عالی** با فیدبک‌های بصری
- 💾 **Local Storage** برای ذخیره جستجوها
- 🔄 **State Management** با React Hooks
- 🎨 **Shadcn UI Components** برای کامپوننت‌های استاندارد

## 🚀 نصب و راه‌اندازی

### پیش‌نیازها

- Node.js 18 یا بالاتر
- npm یا yarn
- مرورگر مدرن (Chrome, Firefox, Safari, Edge)

### مراحل نصب

#### روش 1: استفاده از فایل Batch (ویندوز)

```bash
# 1. دابل کلیک روی install.bat برای نصب
# 2. دابل کلیک روی run.bat برای اجرا
# 3. مرورگر به صورت خودکار باز می‌شود
```

#### روش 2: دستی

```bash
# کلون کردن پروژه
git clone <repository-url>
cd aircraft-tickets

# نصب وابستگی‌ها
npm install

# اجرای سرور توسعه
npm run dev

# باز کردن مرورگر
# http://localhost:3001
```

### حل مشکل PowerShell Execution Policy

اگر با خطای "running scripts is disabled" مواجه شدید:

**راه حل 1:** PowerShell را با دسترسی Administrator باز کنید:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**راه حل 2:** از Command Prompt (CMD) استفاده کنید

جزئیات بیشتر در فایل `INSTALLATION.md`

## 🛠️ تکنولوژی‌های استفاده شده

### Frontend Framework
- **Next.js 15.0** - فریمورک React با قابلیت SSR و App Router
- **React 19.0** - کتابخانه UI با جدیدترین ویژگی‌ها
- **TypeScript 5.5** - برای Type Safety و Developer Experience بهتر

### Styling & UI
- **Tailwind CSS 3.4** - فریمورک Utility-First CSS
- **Shadcn UI** - کامپوننت‌های استاندارد و قابل تنظیم
- **Radix UI** - کامپوننت‌های Accessible و Headless
- **Custom CSS** - برای انیمیشن‌ها و افکت‌های خاص
- **Glass Morphism** - افکت شیشه‌ای مدرن

### Libraries & Tools
- **React Icons 5.3** - آیکون‌های زیبا و متنوع
- **Framer Motion 11.5** - انیمیشن‌های پیشرفته
- **date-fns 3.6** - مدیریت تاریخ میلادی
- **date-fns-jalali 3.6** - پشتیبانی از تاریخ شمسی
- **clsx & tailwind-merge** - مدیریت کلاس‌های CSS
- **class-variance-authority** - مدیریت Variants

## 📁 ساختار پروژه

```
aircraft-tickets/
├── app/                          # صفحات Next.js (App Router)
│   ├── page.tsx                  # صفحه اصلی
│   ├── layout.tsx                # لایه اصلی
│   ├── globals.css               # استایل‌های سراسری
│   ├── flights/                  # پروازها
│   │   └── page.tsx
│   ├── bus/                      # اتوبوس
│   │   ├── page.tsx
│   │   └── results/
│   │       └── page.tsx
│   ├── train/                    # قطار
│   │   ├── page.tsx
│   │   └── results/
│   │       └── page.tsx
│   ├── booking/                  # رزرو
│   │   └── page.tsx
│   ├── payment/                  # پرداخت
│   │   ├── page.tsx
│   │   ├── success/
│   │   └── failed/
│   ├── login/                    # ورود
│   │   └── page.tsx
│   ├── profile/                  # پروفایل
│   │   └── page.tsx
│   └── insurance/                # بیمه
│       ├── page.tsx
│       ├── results/
│       ├── booking/
│       └── payment/
├── components/                   # کامپوننت‌های React
│   ├── auth/                     # احراز هویت
│   │   └── AuthGuard.tsx
│   ├── flights/                  # پروازها
│   │   ├── FlightCard.tsx
│   │   ├── FlightFiltersContent.tsx
│   │   ├── FlightFiltersSidebar.tsx
│   │   ├── FlightToolbar.tsx
│   │   ├── FlightResultsHeader.tsx
│   │   └── MobileFlightCard.tsx
│   ├── transport/                # اتوبوس و قطار
│   │   ├── TransportCard.tsx
│   │   ├── TransportFiltersContent.tsx
│   │   ├── TransportFiltersSidebar.tsx
│   │   ├── TransportToolbar.tsx
│   │   ├── TransportResultsHeader.tsx
│   │   └── MobileTransportCard.tsx
│   ├── booking/                  # رزرو
│   │   ├── PassengerForm.tsx
│   │   └── ContactForm.tsx
│   ├── payment/                  # پرداخت
│   │   ├── PaymentForm.tsx
│   │   └── OrderSummary.tsx
│   ├── home/                     # صفحه اصلی
│   │   ├── FlightSearchBox.tsx
│   │   ├── PopularFlights.tsx
│   │   └── DestinationCards.tsx
│   ├── search/                   # جستجو
│   │   ├── TripSearchBox.tsx
│   │   └── MobileTripSearchBox.tsx
│   ├── layout/                   # لایه
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageLayout.tsx
│   ├── mobile/                   # موبایل
│   │   ├── BottomSheet.tsx
│   │   ├── MobileHeader.tsx
│   │   └── MobileSearchBox.tsx
│   ├── ui/                       # UI Components
│   │   ├── PersianDatePicker.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   └── shadcn/               # Shadcn Components
│   └── providers/                # Context Providers
│       └── AuthProvider.tsx
├── lib/                          # Utilities
│   ├── types.ts                  # TypeScript Types
│   ├── constants.ts              # ثابت‌ها
│   ├── mock-data.ts              # داده‌های نمونه
│   ├── flight-utils.ts           # توابع پرواز
│   ├── transport-utils.ts        # توابع حمل‌ونقل
│   ├── search-utils.ts           # توابع جستجو
│   ├── session.ts                # مدیریت Session
│   └── utils.ts                  # توابع عمومی
├── hooks/                        # Custom Hooks
│   ├── useAuth.ts
│   └── useFlightSearch.ts
├── public/                       # فایل‌های استاتیک
│   ├── hero-bg.svg
│   └── *.svg
├── docs/                         # مستندات
│   ├── TRANSPORT_UPDATES_SUMMARY.md
│   ├── AUTH_GUARD_IMPLEMENTATION.md
│   └── PERSIAN_DATEPICKER_IMPLEMENTATION.md
├── package.json                  # وابستگی‌ها
├── tsconfig.json                 # تنظیمات TypeScript
├── tailwind.config.ts            # تنظیمات Tailwind
├── next.config.js                # تنظیمات Next.js
├── components.json               # تنظیمات Shadcn
├── README.md                     # این فایل
├── INSTALLATION.md               # راهنمای نصب
├── install.bat                   # نصب خودکار (ویندوز)
└── run.bat                       # اجرای خودکار (ویندوز)
```

## 📱 صفحات و قابلیت‌ها

### 1. صفحه اصلی (/)
- هیرو با عنوان جذاب و گرادیانت
- فرم جستجوی پرواز (رفت، رفت و برگشت، چند مسیره)
- انتخاب نوع پرواز (چارتر، سیستمی، خارجی)
- تقویم شمسی برای انتخاب تاریخ
- بخش مقاصد محبوب
- بخش پروازهای پرطرفدار
- تاریخچه جستجوها
- بخش مزایا و ویژگی‌ها
- سوالات متداول (FAQ)
- فوتر کامل

### 2. صفحه پروازها (/flights) 🔐
**نیاز به ورود دارد**

- خلاصه جستجو با امکان ویرایش
- نوار ابزار موبایل (مرتب‌سازی، فیلتر، تقویم)
- فیلترهای پیشرفته:
  - محدوده قیمت با هیستوگرام
  - انتخاب ایرلاین
  - تعداد توقف
- مرتب‌سازی:
  - ارزان‌ترین
  - زودترین پرواز
  - دیرترین پرواز
  - کوتاه‌ترین
- نوار تاریخ با قیمت 9 روز
- لیست پروازها با کارت‌های جذاب
- نمایش جزئیات (زمان، مدت، قیمت، امکانات)
- دکمه انتخاب پرواز

### 3. صفحه اتوبوس (/bus)
- فرم جستجوی اتوبوس
- انتخاب مبدا و مقصد
- تقویم شمسی
- انتخاب تعداد مسافر

### 4. نتایج اتوبوس (/bus/results) 🔐
**نیاز به ورود دارد**

- فیلترهای پیشرفته (شرکت، قیمت)
- مرتب‌سازی (ارزان‌ترین، زودترین، دیرترین)
- نوار تاریخ با قیمت
- نمایش امکانات (VIP، Wi-Fi، پذیرایی)
- کارت‌های اتوبوس با جزئیات کامل

### 5. صفحه قطار (/train)
- فرم جستجوی قطار
- انتخاب مبدا و مقصد
- تقویم شمسی
- انتخاب تعداد مسافر

### 6. نتایج قطار (/train/results) 🔐
**نیاز به ورود دارد**

- فیلترهای پیشرفته (شرکت، قیمت)
- مرتب‌سازی (ارزان‌ترین، زودترین، دیرترین)
- نوار تاریخ با قیمت
- نمایش نوع کوپه و امکانات
- کارت‌های قطار با جزئیات کامل

### 7. صفحه ورود (/login)
- ورود با شماره موبایل
- دریافت کد تأیید (کد تست: **11111**)
- تکمیل اطلاعات (نام، نام خانوادگی)
- نمایش پیشرفت با Step Indicator
- بازگشت به صفحه مقصد پس از ورود

### 8. صفحه رزرو (/booking)
- فرم اطلاعات مسافران
- تقویم شمسی برای تاریخ تولد
- انتخاب جنسیت
- اطلاعات تماس
- قوانین و مقررات

### 9. صفحه پرداخت (/payment)
- انتخاب روش پرداخت (کارت، کیف پول)
- فرم اطلاعات کارت
- خلاصه سفارش
- دکمه پرداخت امن

### 10. صفحه بیمه (/insurance)
- انتخاب طرح بیمه
- مقایسه پوشش‌ها
- فرم اطلاعات بیمه
- تقویم شمسی برای تاریخ شروع/پایان

### 11. صفحه پروفایل (/profile)
- اطلاعات کاربر
- تاریخچه سفرها
- مدیریت حساب

## 📚 مستندات

پروژه شامل مستندات کامل در پوشه اصلی است:

### 1. TRANSPORT_UPDATES_SUMMARY.md
- جزئیات کامل به‌روزرسانی صفحات اتوبوس و قطار
- لیست کامپوننت‌های ایجاد شده
- ویژگی‌های پیاده‌سازی شده
- راهنمای تست

### 2. AUTH_GUARD_IMPLEMENTATION.md
- نحوه کار سیستم احراز هویت
- جزئیات AuthGuard
- فلوی ورود کاربر
- کد تست OTP (11111)
- نکات امنیتی

### 3. PERSIAN_DATEPICKER_IMPLEMENTATION.md
- جزئیات کامل تقویم شمسی
- نحوه استفاده
- Props و API
- مثال‌های کاربردی
- ویژگی‌های پیشرفته

### 4. INSTALLATION.md
- راهنمای نصب گام به گام
- حل مشکلات رایج
- تنظیمات PowerShell
- نکات مهم

## 🔧 دستورات

```bash
# اجرای سرور توسعه
npm run dev

# ساخت نسخه تولید
npm run build

# اجرای نسخه تولید
npm start

# بررسی کد (Linting)
npm run lint

# همگام‌سازی با Figma (اختیاری)
npm run figma:sync
```

## 🎨 ویژگی‌های طراحی

### پالت رنگی

```css
/* Primary Colors */
--primary-blue: #2563eb;      /* آبی اصلی */
--primary-tint1: #dbeafe;     /* آبی روشن */
--primary-shade1: #1e40af;    /* آبی تیره */

/* Neutral Colors */
--neutral-gray1: #f9fafb;     /* خاکستری خیلی روشن */
--neutral-gray2: #f3f4f6;     /* خاکستری روشن */
--neutral-gray3: #e5e7eb;     /* خاکستری */
--neutral-gray6: #6b7280;     /* خاکستری متوسط */
--neutral-gray8: #1f2937;     /* خاکستری تیره */

/* Status Colors */
--status-success: #10b981;    /* سبز (موفق) */
--status-error: #ef4444;      /* قرمز (خطا) */
--status-warning: #f59e0b;    /* نارنجی (هشدار) */
```

### انیمیشن‌ها

- **Fade In** - ورود نرم المان‌ها
- **Slide Up** - حرکت کارت‌ها از پایین
- **Scale In** - بزرگ شدن مودال‌ها
- **Stagger** - تأخیر متوالی در لیست‌ها
- **Hover Effects** - تعاملات موس

### فونت

- **Vazirmatn** - فونت فارسی مدرن و خوانا
- وزن‌های مختلف: 300, 400, 500, 600, 700, 800

## 🌟 ویژگی‌های پیشرفته

### Performance
- **Code Splitting** - بارگذاری تنها کدهای مورد نیاز
- **Lazy Loading** - بارگذاری تصاویر به صورت تنبل
- **Suspense Boundaries** - مدیریت بارگذاری
- **Memoization** - بهینه‌سازی محاسبات

### SEO
- **Metadata** - تگ‌های متا مناسب
- **Semantic HTML** - استفاده از تگ‌های معنادار
- **Alt Tags** - توضیحات تصاویر
- **Structured Data** - داده‌های ساختاریافته

### Accessibility
- **ARIA Labels** - برچسب‌های دسترسی
- **Keyboard Navigation** - پیمایش با کیبورد
- **Focus Management** - مدیریت فوکوس
- **Screen Reader Support** - پشتیبانی از صفحه‌خوان

### Security
- **Input Validation** - اعتبارسنجی ورودی‌ها
- **XSS Protection** - محافظت در برابر XSS
- **CSRF Protection** - محافظت در برابر CSRF
- **Secure Storage** - ذخیره‌سازی امن

## 🧪 تست

### تست دستی

1. **جستجوی پرواز**
   - انتخاب مبدا و مقصد
   - انتخاب تاریخ با تقویم فارسی
   - جستجو و مشاهده نتایج

2. **فیلتر و مرتب‌سازی**
   - اعمال فیلترهای مختلف
   - تغییر مرتب‌سازی
   - انتخاب تاریخ از نوار تاریخ

3. **احراز هویت**
   - ورود با شماره موبایل
   - وارد کردن کد 11111
   - تکمیل اطلاعات
   - بازگشت به صفحه مقصد

4. **رزرو**
   - انتخاب پرواز/اتوبوس/قطار
   - پر کردن فرم مسافران
   - انتخاب تاریخ تولد با تقویم
   - پرداخت

### تست موبایل

- تست روی دستگاه‌های مختلف
- تست Bottom Sheet
- تست تاچ و اسکرول
- تست تقویم موبایل

## 📝 نکات مهم

### ⚠️ محیط توسعه

این یک پروژه نمونه برای یادگیری و نمایش است.

برای استفاده در محیط تولید نیاز به موارد زیر دارد:

- ✅ اتصال به API واقعی برای دریافت پروازها
- ✅ سیستم احراز هویت واقعی با SMS
- ✅ درگاه پرداخت واقعی
- ✅ پایگاه داده برای ذخیره رزروها
- ✅ سیستم مدیریت محتوا (CMS)
- ✅ امنیت بیشتر و اعتبارسنجی سمت سرور
- ✅ سیستم لاگ و مانیتورینگ
- ✅ Backup و Recovery
- ✅ Load Balancing
- ✅ CDN برای فایل‌های استاتیک

### 🔐 کد تست OTP

برای تست سیستم ورود، از کد **11111** استفاده کنید.

### 🗓️ تقویم شمسی

تمام تاریخ‌ها در فرمت ISO (YYYY-MM-DD) ذخیره می‌شوند اما با تقویم شمسی نمایش داده می‌شوند.

## 🤝 مشارکت

برای مشارکت در این پروژه:

1. Fork کنید
2. Branch جدید بسازید (`git checkout -b feature/AmazingFeature`)
3. تغییرات را Commit کنید (`git commit -m 'Add some AmazingFeature'`)
4. Push کنید (`git push origin feature/AmazingFeature`)
5. Pull Request ایجاد کنید

### راهنمای مشارکت

- از TypeScript استفاده کنید
- کد را مستند کنید
- از Prettier برای فرمت کد استفاده کنید
- تست‌های لازم را اضافه کنید
- از Conventional Commits استفاده کنید

## 📄 مجوز

این پروژه تحت مجوز MIT منتشر شده است.

## 👨‍💻 توسعه‌دهنده

ساخته شده با ❤️ برای یادگیری و نمونه‌کار

## 🔗 لینک‌های مفید

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org)

## 📞 پشتیبانی

برای سوالات و مشکلات:

1. مستندات پروژه را مطالعه کنید
2. Issues را در GitHub بررسی کنید
3. Issue جدید ایجاد کنید

---

**نکته:** برای اطلاعات بیشتر درباره نصب و رفع مشکلات، فایل‌های مستندات را مطالعه کنید:
- `INSTALLATION.md` - راهنمای نصب
- `TRANSPORT_UPDATES_SUMMARY.md` - به‌روزرسانی‌های حمل‌ونقل
- `AUTH_GUARD_IMPLEMENTATION.md` - سیستم احراز هویت
- `PERSIAN_DATEPICKER_IMPLEMENTATION.md` - تقویم شمسی

**نسخه:** 1.0.0  
**آخرین به‌روزرسانی:** 2026-06-21