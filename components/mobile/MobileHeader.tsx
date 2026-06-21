'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaUser } from 'react-icons/fa';
import clsx from 'clsx';
import Logo from '@/components/shared/Logo';
import MobileMenu from './MobileMenu';
import { useAuth } from '@/hooks/useAuth';

interface MobileHeaderProps {
  isLoggedIn?: boolean;
  showBack?: boolean;
  title?: string;
}

export default function MobileHeader({ isLoggedIn, title }: MobileHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { ready, isLoggedIn: authLoggedIn } = useAuth();
  const loggedIn = isLoggedIn ?? (ready && authLoggedIn);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-neutral-gray2">
        <div className="flex items-center justify-between h-14 px-4">
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="منو"
            className="w-10 h-10 flex items-center justify-center"
          >
            <FaBars className="text-neutral-gray8 text-xl" />
          </button>

          {title ? (
            <span className="font-bold text-neutral-gray8 text-sm">{title}</span>
          ) : (
            <Logo size="sm" />
          )}

          <Link
            href={loggedIn ? '/account' : '/login'}
            className="w-10 h-10 flex items-center justify-center"
          >
            <FaUser className={clsx('text-xl', pathname === '/login' ? 'text-primary-blue' : 'text-neutral-gray7')} />
          </Link>
        </div>

       
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} isLoggedIn={loggedIn} />
    </>
  );
}
