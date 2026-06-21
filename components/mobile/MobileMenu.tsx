'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTimes, FaPhone, FaSignOutAlt } from 'react-icons/fa';
import Logo from '@/components/shared/Logo';
import { MOBILE_MENU_LOGGED_OUT, MOBILE_MENU_LOGGED_IN } from '@/lib/mobile-nav';
import { cn } from '@/lib/utils';

const OPEN_MS = 520;
const CLOSE_MS = 320;

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  isLoggedIn?: boolean;
}

export default function MobileMenu({ open, onClose, isLoggedIn = false }: MobileMenuProps) {
  const pathname = usePathname();
  const links = isLoggedIn ? MOBILE_MENU_LOGGED_IN : MOBILE_MENU_LOGGED_OUT;
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setVisible(false);
      const timer = window.setTimeout(() => setVisible(true), 16);
      return () => window.clearTimeout(timer);
    }

    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), CLOSE_MS);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[90] lg:hidden" aria-hidden={!visible}>
      <div
        className={cn(
          'absolute inset-0 bg-black/40 transition-opacity ease-out',
          visible ? 'opacity-100 duration-500' : 'opacity-0 duration-300'
        )}
        style={{ transitionDuration: visible ? `${OPEN_MS}ms` : `${CLOSE_MS}ms` }}
        onClick={onClose}
      />
      <div
        className={cn(
          'absolute top-0 right-0 h-full w-[280px] max-w-[85vw] bg-white shadow-xl flex flex-col',
          visible ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{
          transition: `transform ${visible ? OPEN_MS : CLOSE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        <div className="flex items-center justify-between p-4 border-b border-neutral-gray2 shrink-0">
          <button onClick={onClose} aria-label="بستن">
            <FaTimes className="text-neutral-gray7 text-xl" />
          </button>
          <Logo size="sm" />
        </div>

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                'block px-4 py-3 rounded-lg text-base transition-colors',
                pathname === link.href
                  ? 'bg-primary-tint1 text-primary-blue font-bold'
                  : 'text-neutral-gray8 hover:bg-neutral-gray1'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {isLoggedIn && (
          <div className="p-4 border-t border-neutral-gray2 shrink-0">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center gap-2 text-status-error px-4 py-3"
            >
              <FaSignOutAlt />
              <span>خروج از حساب</span>
            </Link>
          </div>
        )}

        <div className="p-4 border-t border-neutral-gray2 bg-white shrink-0">
          <a href="tel:0214045" className="flex items-center gap-2 text-primary-blue">
            <FaPhone />
            <span className="text-sm font-semibold">پشتیبانی 021-4045</span>
          </a>
        </div>
      </div>
    </div>
  );
}
