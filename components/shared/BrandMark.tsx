'use client';

import { useId } from 'react';

interface BrandMarkProps {
  className?: string;
  size?: number;
}

/** Ticket + real airliner mark for logo, splash, and loader. */
export default function BrandMark({ className = '', size = 40 }: BrandMarkProps) {
  const uid = useId().replace(/:/g, '');
  const bgId = `bm-bg-${uid}`;
  const sheenId = `bm-sheen-${uid}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={bgId} x1="8" y1="6" x2="56" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2BA4DE" />
          <stop offset="0.55" stopColor="#1D91CC" />
          <stop offset="1" stopColor="#11577A" />
        </linearGradient>
        <linearGradient id={sheenId} x1="12" y1="10" x2="48" y2="52" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="64" height="64" rx="16" fill={`url(#${bgId})`} />
      <rect width="64" height="64" rx="16" fill={`url(#${sheenId})`} />

      <path
        d="M14 22.5c0-2.5 2-4.5 4.5-4.5h27c2.5 0 4.5 2 4.5 4.5v6.2c-1.9.4-3.3 2.1-3.3 4.1s1.4 3.7 3.3 4.1v6.2c0 2.5-2 4.5-4.5 4.5h-27c-2.5 0-4.5-2-4.5-4.5v-6.2c1.9-.4 3.3-2.1 3.3-4.1s-1.4-3.7-3.3-4.1V22.5z"
        fill="#fff"
        fillOpacity="0.96"
      />
      <path
        d="M40.5 18.5v27"
        stroke="#1D91CC"
        strokeOpacity="0.28"
        strokeWidth="1.5"
        strokeDasharray="2.2 2.6"
        strokeLinecap="round"
      />

      {/* Real commercial airplane (Material flight path), nose up-right */}
      <path
        fill="#11577A"
        transform="translate(16.5 20.5) scale(1.15) rotate(-45 12 12)"
        d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
      />
    </svg>
  );
}
