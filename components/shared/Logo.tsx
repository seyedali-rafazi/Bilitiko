import Link from 'next/link';
import BrandMark from '@/components/shared/BrandMark';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const sizes = {
  sm: {
    text: 'text-lg',
    subtitle: 'text-[8px]',
    mark: 32,
    gap: 'gap-2',
  },
  md: {
    text: 'text-2xl',
    subtitle: 'text-[10px]',
    mark: 40,
    gap: 'gap-3',
  },
  lg: {
    text: 'text-3xl',
    subtitle: 'text-xs',
    mark: 48,
    gap: 'gap-3',
  },
};

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const s = sizes[size];

  return (
    <Link href="/" className={`flex items-center ${s.gap} hover:opacity-90 transition-all group`}>
      <div className="relative rounded-[14px] overflow-hidden shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
        <BrandMark size={s.mark} />
      </div>

      {showText && (
        <div className="flex flex-col items-start">
          <h1
            className={`${s.text} font-bold bg-gradient-to-l from-primary-blue to-primary-shade1 bg-clip-text text-transparent leading-tight`}
          >
            بیلیتیکو
          </h1>
          <span className={`${s.subtitle} text-neutral-gray5 font-medium tracking-wide`}>
            رزرو آنلاین بلیط
          </span>
        </div>
      )}
    </Link>
  );
}
