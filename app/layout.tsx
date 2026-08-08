import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'بیلیتیکو | رزرو بلیط هواپیما',
  description: 'سیستم رزرو آنلاین بلیط هواپیما - ارزان‌ترین و بهترین پروازها',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-white antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
