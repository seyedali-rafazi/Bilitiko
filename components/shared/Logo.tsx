import Link from 'next/link';
import { FaPlane } from 'react-icons/fa';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const sizes = {
  sm: { 
    text: 'text-lg', 
    subtitle: 'text-[8px]',
    icon: 'text-base', 
    container: 'w-8 h-8',
    gap: 'gap-2'
  },
  md: { 
    text: 'text-2xl', 
    subtitle: 'text-[10px]',
    icon: 'text-xl', 
    container: 'w-10 h-10',
    gap: 'gap-3'
  },
  lg: { 
    text: 'text-3xl', 
    subtitle: 'text-xs',
    icon: 'text-2xl', 
    container: 'w-12 h-12',
    gap: 'gap-3'
  },
};

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const s = sizes[size];
  
  return (
    <Link href="/" className={`flex items-center ${s.gap} hover:opacity-90 transition-all group`}>
      {/* Advanced Logo Icon with Gradient Background */}
      <div className={`${s.container} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-blue via-primary to-primary-shade1 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105`}>
        {/* Decorative Overlay */}
        <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-sm"></div>
        
        {/* Plane Icon */}
        <FaPlane className={`${s.icon} text-white -rotate-45 relative z-10 drop-shadow-md`} />
        
        {/* Accent Dot */}
        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white/60 rounded-full"></div>
      </div>
      
      {/* Text Logo */}
      {showText && (
        <div className="flex flex-col items-start">
          <h1 className={`${s.text} font-bold bg-gradient-to-l from-primary-blue to-primary bg-clip-text text-transparent leading-tight`}>
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

