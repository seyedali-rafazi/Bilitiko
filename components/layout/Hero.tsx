interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  height?: string;
}

export default function Hero({
  title,
  subtitle,
  backgroundImage = '/hero-bg.svg',
  height = 'h-[340px]',
}: HeroProps) {
  return (
    <div className={`relative ${height} overflow-hidden`}>
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-[#1C6FB9]/90 via-[#1C6FB9]/50 to-transparent" />
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-3xl text-right">
          <h1 className="text-white text-2xl sm:text-3xl md:text-[40px] font-bold leading-[150%] text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="text-white/90 text-base md:text-lg mt-4">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
