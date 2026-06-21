'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function NavigationProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevPath = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const startProgress = (href: string | null) => {
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return;
      const path = href.split('?')[0];
      if (path === pathname) return;

      setActive(true);
      setProgress(18);

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setProgress((p) => (p < 85 ? p + Math.random() * 12 : p));
      }, 180);
    };

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor || anchor.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey) return;
      startProgress(anchor.getAttribute('href'));
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname]);

  useEffect(() => {
    if (prevPath.current === pathname) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setProgress(100);
    const hide = setTimeout(() => {
      setActive(false);
      setProgress(0);
    }, 280);

    prevPath.current = pathname;
    return () => clearTimeout(hide);
  }, [pathname]);

  useEffect(() => () => {
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  if (!active && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[400] h-[3px] pointer-events-none"
      role="progressbar"
      aria-hidden={!active}
    >
      <div
        className="h-full bg-gradient-to-l from-primary-blue to-primary-shade1 shadow-[0_0_8px_rgba(29,145,204,0.6)] transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
