'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import clsx from 'clsx';
import Logo from '@/components/shared/Logo';
import Button from '@/components/ui/Button';
import { NAV_LINKS } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';
import { getUserDisplayName } from '@/lib/session';

export default function Navbar() {
  const pathname = usePathname();
  const { ready, isLoggedIn, user } = useAuth();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="bg-white border-b border-neutral-gray2 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 max-w-[1224px]">
        <div className="flex items-center justify-between h-[88px] lg:h-[104px]">
          <Logo />

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'text-lg transition-colors pb-1 whitespace-nowrap',
                  isActive(link.href)
                    ? 'text-primary-blue font-bold border-b-2 border-primary-blue'
                    : 'text-neutral-gray7 hover:text-primary-blue'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 lg:gap-4">
            {ready && isLoggedIn ? (
              <Link href="/profile">
                <Button size="sm" variant="outline" className="gap-2">
                  <FaUser className="w-4 h-4" />
                  <span className="hidden sm:inline">{getUserDisplayName(user)}</span>
                  <span className="sm:hidden">پروفایل</span>
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="sm" className="gap-2">
                  <FaUser className="w-4 h-4" />
                  <span className="hidden sm:inline">ورود/ ثبت نام</span>
                  <span className="sm:hidden">ورود</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
