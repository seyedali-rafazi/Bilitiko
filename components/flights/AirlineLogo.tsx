const AIRLINE_STYLES: Record<string, { code: string; gradient: string }> = {
  'ایران ایر': { code: 'IR', gradient: 'from-[#1a3a6b] to-[#2d5aa0]' },
  'ماهان': { code: 'W5', gradient: 'from-[#0d6e4f] to-[#12a37a]' },
  'آسمان': { code: 'EP', gradient: 'from-[#7c3aed] to-[#a855f7]' },
  'قشم ایر': { code: 'QB', gradient: 'from-[#c2410c] to-[#ea580c]' },
};

interface AirlineLogoProps {
  airline: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'w-9 h-9 text-[10px] rounded-lg',
  md: 'w-11 h-11 text-xs rounded-xl',
  lg: 'w-14 h-14 text-sm rounded-xl',
};

export default function AirlineLogo({ airline, size = 'md' }: AirlineLogoProps) {
  const style = AIRLINE_STYLES[airline] ?? {
    code: airline.slice(0, 2),
    gradient: 'from-primary-blue to-primary-shade1',
  };

  return (
    <div
      className={`${sizes[size]} shrink-0 bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-sm`}
    >
      <span className="font-bold text-white tracking-wide">{style.code}</span>
    </div>
  );
}
