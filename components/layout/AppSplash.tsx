'use client';

import { useEffect, useState } from 'react';
import BrandMark from '@/components/shared/BrandMark';

const SPLASH_KEY = 'bilito-splash-shown';
const MIN_DISPLAY_MS = 2400;

export default function AppSplash() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(SPLASH_KEY)) return;

    setVisible(true);

    const start = Date.now();
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / MIN_DISPLAY_MS) * 100));
      setProgress(pct);
    }, 40);

    const doneTimer = setTimeout(() => {
      setProgress(100);
      setFadeOut(true);
      setTimeout(() => {
        sessionStorage.setItem(SPLASH_KEY, '1');
        setVisible(false);
      }, 600);
    }, MIN_DISPLAY_MS);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-600 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-hidden={fadeOut}
    >
      <div className="splash-bg absolute inset-0" />
      <div className="splash-grid absolute inset-0 opacity-30" />
      <div className="splash-aurora absolute inset-0" />

      <div className="relative z-10 flex flex-col items-center px-6">
        <div className="splash-logo-wrap mb-8">
          <div className="splash-orbit splash-orbit-1" />
          <div className="splash-orbit splash-orbit-2" />
          <div className="splash-orbit-plane" aria-hidden>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="white"
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              />
            </svg>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/25 splash-mark-pulse">
            <BrandMark size={88} />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">بیلیتیکو</h1>
        <p className="text-white/70 text-sm mb-10">رزرو آنلاین بلیط سفر</p>

        <div className="w-56 h-1.5 bg-white/20 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-l from-white to-primary-tint5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-white/50 text-xs tabular-nums">{progress}%</p>
      </div>
    </div>
  );
}
