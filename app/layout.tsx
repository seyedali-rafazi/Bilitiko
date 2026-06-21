import type { Metadata } from 'next';
import './globals.css';
import AppShell from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'بیلیتو | رزرو بلیط هواپیما',
  description: 'سیستم رزرو آنلاین بلیط هواپیما - ارزان‌ترین و بهترین پروازها',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
