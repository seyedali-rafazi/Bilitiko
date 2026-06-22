'use client';

import { useEffect, useState } from 'react';
import { FaPlane } from 'react-icons/fa';

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

      <div className="relative z-10 flex flex-col items-center px-6">
        <div className="splash-logo-wrap mb-8">
          <div className="splash-orbit splash-orbit-1" />
          <div className="splash-orbit splash-orbit-2" />
          <div className="bg-gradient-to-br from-primary-blue to-primary-shade1 p-5 rounded-2xl shadow-2xl shadow-primary-blue/30">
            <FaPlane className="text-white text-4xl -rotate-45 splash-plane-icon" />
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
        <p className="text-white/50 text-xs">{progress}%</p>
      </div>
    </div>
  );
}
