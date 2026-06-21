import Link from 'next/link';
import { FaPlane } from 'react-icons/fa';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: { text: 'text-xl', icon: 'text-lg', padding: 'p-2' },
  md: { text: 'text-2xl', icon: 'text-2xl', padding: 'p-3' },
  lg: { text: 'text-3xl', icon: 'text-3xl', padding: 'p-4' },
};

export default function Logo({ size = 'md' }: LogoProps) {
  const s = sizes[size];
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex flex-col items-end">
        <h1 className={`${s.text} font-bold text-primary-blue`}>بیلیتو</h1>
      </div>
      <div className={`bg-gradient-to-br from-primary-blue to-primary-shade1 ${s.padding} rounded-xl`}>
        <FaPlane className={`text-white ${s.icon} transform -rotate-45`} />
      </div>
    </Link>
  );
}
