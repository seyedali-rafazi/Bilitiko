import clsx from 'clsx';
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import MobileHeader from '@/components/mobile/MobileHeader';

interface PageLayoutProps {
  children: ReactNode;
  showFooter?: boolean;
  className?: string;
  mobileTitle?: string;
  isLoggedIn?: boolean;
  hideMobileHeader?: boolean;
}

export default function PageLayout({
  children,
  showFooter = true,
  className = 'min-h-screen bg-white',
  mobileTitle,
  isLoggedIn = false,
  hideMobileHeader = false,
}: PageLayoutProps) {
  return (
    <div className={clsx(className, 'flex flex-col min-h-screen')}>
      {!hideMobileHeader && (
        <MobileHeader isLoggedIn={isLoggedIn} title={mobileTitle} />
      )}
      <div className="hidden lg:block">
        <Navbar />
      </div>
      <main className="pb-safe flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
