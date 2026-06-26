# 🎫 بیلیتیکو - سیستم رزرو بلیط آنلاین

یک وب‌اپلیکیشن مدرن و حرفه‌ای برای رزرو آنلاین بلیط هواپیما، اتوبوس و قطار با استفاده از جدیدترین تکنولوژی‌ها

![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.x-764abc?style=for-the-badge&logo=redux)

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
- **نوار پیشرفت ناوبری** با NavigationProgress

### 🚀 قابلیت‌های اصلی

#### ✈️ رزرو بلیط هواپیما
- جستجوی پیشرفته با فیلترهای متنوع
- نمایش پروازها با جزئیات کامل
- فیلتر بر اساس ایرلاین، قیمت، توقف
- مرتب‌سازی (ارزان‌ترین، زودترین، دیرترین)
- نوار تاریخ با نمایش قیمت ۹ روز
- نمایش هیستوگرام قیمت
- لوگوی ایرلاین و خط زمانی مسیر پرواز

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

#### 🛡️ بیمه مسافرتی
- انتخاب طرح بیمه با مقایسه پوشش‌ها
- فرم اطلاعات بیمه با تقویم شمسی
- صفحه نتایج، رزرو، پرداخت و تأییدیه

#### 🔐 احراز هویت
- سیستم ورود با شماره موبایل
- ثبت‌نام با ایمیل و رمز عبور
- بازیابی رمز عبور
- تأیید با کد OTP (کد تست: 11111)
- محافظت از صفحات با Auth Guard
- بازگشت به صفحه مقصد پس از ورود

#### 🗓️ تقویم شمسی
- Date Picker فارسی در تمام فرم‌ها
- نمایش ماه‌های شمسی
- هفته شروع از شنبه
- اعتبارسنجی تاریخ (min/max)
- دکمه انتخاب سریع "امروز"

#### 📄 بلیط دیجیتال
- دانلود بلیط به صورت PDF با jsPDF
- تولید QR Code یکتا برای هر بلیط
- صفحه تأییدیه با کد پیگیری

#### 💳 کیف پول
- نمایش موجودی کیف پول
- شارژ کیف پول با مبالغ سریع
- تاریخچه تراکنش‌ها

### ⚡ قابلیت‌های پیشرفته

- 🔍 **جستجوی هوشمند** با اعتبارسنجی فیلدها
- 📊 **فیلترهای پیشرفته** با هیستوگرام قیمت
- 📱 **Bottom Sheet** برای موبایل
- 🎯 **تجربه کاربری عالی** با فیدبک‌های بصری
- 💾 **Local Storage** برای ذخیره جستجوها و رزروها
- 🔄 **State Management** با Redux Toolkit
- 🎨 **Shadcn UI Components** برای کامپوننت‌های استاندارد
- 🍞 **Toast Notifications** برای اطلاع‌رسانی به کاربر
- 🌀 **Loading Spinner و Splash Screen** برای تجربه کاربری بهتر
- 📡 **API Layer** با `lib/api.ts` برای ارتباط با سرور

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
- **Lucide React** - آیکون‌های مدرن SVG

### State Management
- **Redux Toolkit 2.x** - مدیریت State با bookingSlice
- **React Redux 9.x** - اتصال React با Redux

### Libraries & Tools
- **React Icons 5.3** - آیکون‌های زیبا و متنوع
- **Framer Motion 11.5** - انیمیشن‌های پیشرفته
- **date-fns 3.6** - مدیریت تاریخ میلادی
- **date-fns-jalali 3.6** - پشتیبانی از تاریخ شمسی
- **jsPDF 4.x** - تولید فایل PDF برای بلیط دیجیتال
- **jspdf-autotable 5.x** - جداول در PDF
- **QRCode 1.5** - تولید QR Code
- **clsx & tailwind-merge** - مدیریت کلاس‌های CSS
- **class-variance-authority** - مدیریت Variants

## 📁 ساختار پروژه

```
aircraft-tickets/
├── app/                          # صفحات Next.js (App Router)
│   ├── page.tsx                  # صفحه اصلی
│   ├── layout.tsx                # لایه اصلی
│   ├── loading.tsx               # صفحه لودینگ
│   ├── not-found.tsx             # صفحه 404
│   ├── globals.css               # استایل‌های سراسری
│   ├── icon.svg                  # آیکون سایت
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
│   │   │   └── page.tsx
│   │   └── failed/
│   │       └── page.tsx
│   ├── confirmation/             # تأییدیه رزرو + دانلود PDF
│   │   └── page.tsx
│   ├── insurance/                # بیمه مسافرتی
│   │   ├── page.tsx
│   │   ├── results/
│   │   │   └── page.tsx
│   │   ├── booking/
│   │   │   └── page.tsx
│   │   ├── payment/
│   │   │   └── page.tsx
│   │   └── confirmation/
│   │       └── page.tsx
│   ├── login/                    # ورود
│   │   └── page.tsx
│   ├── register/                 # ثبت‌نام
│   │   └── page.tsx
│   ├── forgot-password/          # بازیابی رمز عبور
│   │   └── page.tsx
│   ├── profile/                  # پروفایل
│   │   └── page.tsx
│   ├── account/                  # حساب کاربری (موبایل)
│   │   └── page.tsx
│   ├── wallet/                   # کیف پول
│   │   └── page.tsx
│   ├── about/                    # درباره ما
│   │   └── page.tsx
│   ├── contact/                  # تماس با ما
│   │   └── page.tsx
│   ├── terms/                    # قوانین و مقررات
│   │   └── page.tsx
│   ├── guide/                    # راهنمای خرید
│   │   └── page.tsx
│   ├── refund/                   # استرداد بلیط
│   │   └── page.tsx
│   ├── other/                    # سایر خدمات
│   │   └── page.tsx
│   └── 405/                      # خطای 405
│       └── page.tsx
├── components/                   # کامپوننت‌های React
│   ├── auth/
│   │   └── AuthGuard.tsx
│   ├── flights/
│   │   ├── AirlineLogo.tsx
│   │   ├── FlightCard.tsx
│   │   ├── FlightFiltersContent.tsx
│   │   ├── FlightFiltersSidebar.tsx
│   │   ├── FlightResultsHeader.tsx
│   │   ├── FlightRouteTimeline.tsx
│   │   ├── FlightToolbar.tsx
│   │   ├── MobileFlightCard.tsx
│   │   └── SearchSummary.tsx
│   ├── transport/
│   │   ├── MobileTransportCard.tsx
│   │   ├── TransportCard.tsx
│   │   ├── TransportFiltersContent.tsx
│   │   ├── TransportFiltersSidebar.tsx
│   │   ├── TransportResultsHeader.tsx
│   │   └── TransportToolbar.tsx
│   ├── booking/
│   │   ├── PassengerForm.tsx
│   │   └── ContactForm.tsx
│   ├── payment/
│   │   ├── OrderSummary.tsx
│   │   ├── PaymentForm.tsx
│   │   └── PaymentMethodIcon.tsx
│   ├── home/
│   │   ├── AdvantagesSection.tsx
│   │   ├── DestinationCards.tsx
│   │   ├── FAQSection.tsx
│   │   ├── FlightSearchBox.tsx
│   │   ├── PopularFlights.tsx
│   │   └── SearchHistory.tsx
│   ├── search/
│   │   ├── MobileTripSearchBox.tsx
│   │   ├── TransportResultCard.tsx
│   │   ├── TripSearchBox.tsx
│   │   └── TripSearchSummary.tsx
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── AppSplash.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── NavigationProgress.tsx
│   │   ├── PageHeader.tsx
│   │   └── PageLayout.tsx
│   ├── mobile/
│   │   ├── BottomSheet.tsx
│   │   ├── MobileHeader.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── MobileSearchBox.tsx
│   │   └── StepIndicator.tsx
│   ├── shared/
│   │   ├── ContentSection.tsx
│   │   └── Logo.tsx
│   ├── ui/
│   │   ├── Accordion.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Modal.tsx
│   │   ├── PersianDatePicker.tsx
│   │   ├── Select.tsx
│   │   ├── SuccessAnimation.tsx
│   │   ├── Tabs.tsx
│   │   └── shadcn/               # Shadcn Components
│   └── providers/
│       ├── AuthProvider.tsx
│       ├── StoreProvider.tsx
│       └── ToastProvider.tsx
├── lib/                          # Utilities & Services
│   ├── api.ts                    # لایه API
│   ├── api-transforms.ts         # تبدیل داده‌های API
│   ├── booking-storage.ts        # ذخیره‌سازی رزرو
│   ├── card-format.ts            # فرمت کارت بانکی
│   ├── constants.ts              # ثابت‌ها
│   ├── error-messages.ts         # پیام‌های خطا به فارسی
│   ├── flight-utils.ts           # توابع پرواز
│   ├── insurance-data.ts         # داده‌های بیمه
│   ├── mobile-nav.ts             # پیمایش موبایل
│   ├── mock-data.ts              # داده‌های نمونه
│   ├── pdf-generator.ts          # تولید PDF بلیط
│   ├── search-utils.ts           # توابع جستجو
│   ├── session.ts                # مدیریت Session
│   ├── transport-utils.ts        # توابع حمل‌ونقل
│   ├── types.ts                  # TypeScript Types
│   ├── utils.ts                  # توابع عمومی
│   ├── store/                    # Redux Store
│   │   ├── bookingSlice.ts
│   │   ├── hooks.ts
│   │   └── index.ts
│   └── figma/
│       └── manifest.json
├── hooks/                        # Custom Hooks
│   ├── useAuth.ts
│   └── useFlightSearch.ts
├── scripts/                      # اسکریپت‌های ابزاری
│   └── fetch-figma.mjs
├── public/                       # فایل‌های استاتیک
│   ├── hero-bg.svg
│   └── *.svg
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── components.json
├── README.md
├── INSTALLATION.md
├── install.bat
└── run.bat
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
- مرتب‌سازی: ارزان‌ترین، زودترین، دیرترین، کوتاه‌ترین
- نوار تاریخ با قیمت ۹ روز
- لیست پروازها با لوگوی ایرلاین و خط زمانی مسیر
- دکمه انتخاب پرواز

### 3. صفحه اتوبوس (/bus)
- فرم جستجوی اتوبوس با تقویم شمسی

### 4. نتایج اتوبوس (/bus/results) 🔐
**نیاز به ورود دارد**

- فیلترهای پیشرفته (شرکت، قیمت)
- نمایش امکانات (VIP، Wi-Fi، پذیرایی)

### 5. صفحه قطار (/train)
- فرم جستجوی قطار با تقویم شمسی

### 6. نتایج قطار (/train/results) 🔐
**نیاز به ورود دارد**

- فیلترهای پیشرفته (شرکت، قیمت)
- نمایش نوع کوپه و امکانات

### 7. صفحه ورود (/login)
- ورود با شماره موبایل
- دریافت کد تأیید (کد تست: **11111**)
- نمایش پیشرفت با Step Indicator
- بازگشت به صفحه مقصد پس از ورود

### 8. صفحه ثبت‌نام (/register)
- ثبت‌نام با نام، نام خانوادگی، ایمیل و رمز عبور
- اتصال به API Layer

### 9. بازیابی رمز عبور (/forgot-password)
- دریافت لینک بازیابی از طریق ایمیل

### 10. صفحه رزرو (/booking)
- فرم اطلاعات مسافران
- تقویم شمسی برای تاریخ تولد
- انتخاب جنسیت
- اطلاعات تماس

### 11. صفحه پرداخت (/payment)
- انتخاب روش پرداخت (کارت، کیف پول)
- فرمت خودکار شماره کارت
- خلاصه سفارش
- دکمه پرداخت امن

### 12. صفحه تأییدیه (/confirmation)
- کد پیگیری یکتا (BL-XXXXXXXX)
- دانلود بلیط به صورت PDF
- QR Code یکتا برای هر بلیط

### 13. بیمه مسافرتی (/insurance)
- انتخاب طرح بیمه با مقایسه پوشش‌ها (/insurance)
- نتایج بیمه (/insurance/results)
- رزرو بیمه (/insurance/booking)
- پرداخت بیمه (/insurance/payment)
- تأییدیه بیمه (/insurance/confirmation)

### 14. صفحه پروفایل (/profile)
- اطلاعات کاربر و تاریخچه سفرها

### 15. حساب کاربری (/account) 🔐
- منوی کامل حساب کاربری (موبایل فرست)
- دسترسی به پروفایل، کیف پول، سفرها و خروج

### 16. کیف پول (/wallet) 🔐
- نمایش موجودی
- شارژ با مبالغ سریع یا دستی
- تاریخچه تراکنش‌ها

### 17. صفحات اطلاعاتی
- **درباره ما** (/about) - معرفی شرکت
- **تماس با ما** (/contact) - فرم ارتباطی
- **قوانین و مقررات** (/terms)
- **راهنمای خرید** (/guide) - مراحل خرید بلیط
- **استرداد بلیط** (/refund) - شرایط و مراحل استرداد
- **سایر خدمات** (/other) - هتل، اجاره خودرو، تور و...

## 📚 مستندات

پروژه شامل مستندات در پوشه اصلی است:

### 1. INSTALLATION.md
- راهنمای نصب گام به گام
- حل مشکلات رایج
- تنظیمات PowerShell

### 2. TRANSPORT_UPDATES_SUMMARY.md
- جزئیات به‌روزرسانی صفحات اتوبوس و قطار

### 3. AUTH_GUARD_IMPLEMENTATION.md
- نحوه کار سیستم احراز هویت
- فلوی ورود کاربر و کد تست OTP

### 4. PERSIAN_DATEPICKER_IMPLEMENTATION.md
- جزئیات کامل تقویم شمسی، Props و API

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
--neutral-gray1: #f9fafb;
--neutral-gray2: #f3f4f6;
--neutral-gray3: #e5e7eb;
--neutral-gray6: #6b7280;
--neutral-gray8: #1f2937;

/* Status Colors */
--status-success: #10b981;
--status-error: #ef4444;
--status-warning: #f59e0b;
```

### انیمیشن‌ها

- **Fade In** - ورود نرم المان‌ها
- **Slide Up** - حرکت کارت‌ها از پایین
- **Scale In** - بزرگ شدن مودال‌ها
- **Stagger** - تأخیر متوالی در لیست‌ها
- **NavigationProgress** - نوار پیشرفت بارگذاری صفحه

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

### Accessibility
- **ARIA Labels** - برچسب‌های دسترسی
- **Keyboard Navigation** - پیمایش با کیبورد
- **Focus Management** - مدیریت فوکوس

### Security
- **Input Validation** - اعتبارسنجی ورودی‌ها
- **Auth Guard** - محافظت از مسیرهای خصوصی
- **Secure Storage** - ذخیره‌سازی امن Session

## 🧪 تست

### تست دستی

1. **جستجوی پرواز** — انتخاب مبدا، مقصد، تاریخ و جستجو
2. **فیلتر و مرتب‌سازی** — اعمال فیلترهای مختلف
3. **احراز هویت** — ورود با موبایل، کد **11111**، تکمیل اطلاعات
4. **رزرو کامل** — انتخاب پرواز → فرم مسافران → پرداخت → تأییدیه
5. **دانلود PDF** — در صفحه تأییدیه، دانلود بلیط دیجیتال
6. **بیمه** — جستجو → انتخاب طرح → پرداخت → تأییدیه

### تست موبایل
- تست Bottom Sheet و MobileMenu
- تست تاچ و اسکرول
- تست تقویم موبایل
- تست صفحه Account (منوی موبایل)

## 📝 نکات مهم

### ⚠️ محیط توسعه

این یک پروژه نمونه برای یادگیری و نمایش است.

برای استفاده در محیط تولید نیاز به موارد زیر دارد:

- ✅ اتصال به API واقعی برای دریافت پروازها
- ✅ سیستم احراز هویت واقعی با SMS
- ✅ درگاه پرداخت واقعی
- ✅ پایگاه داده برای ذخیره رزروها
- ✅ امنیت بیشتر و اعتبارسنجی سمت سرور
- ✅ سیستم لاگ و مانیتورینگ
- ✅ CDN برای فایل‌های استاتیک

### 🔐 کد تست OTP

برای تست سیستم ورود، از کد **11111** استفاده کنید.

### 🗓️ تقویم شمسی

تمام تاریخ‌ها در فرمت ISO (YYYY-MM-DD) ذخیره می‌شوند اما با تقویم شمسی نمایش داده می‌شوند.

### 📄 PDF بلیط

بلیط دیجیتال با استفاده از jsPDF تولید می‌شود و شامل QR Code یکتا، اطلاعات پرواز و مسافران است.

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
- [Redux Toolkit](https://redux-toolkit.js.org)
- [jsPDF](https://jspdf.io)

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

**نسخه:** 2.0.0  
**آخرین به‌روزرسانی:** 2025-07-16
