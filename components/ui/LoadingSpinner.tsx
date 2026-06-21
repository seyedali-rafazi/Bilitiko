interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: { ring: 'w-10 h-10', text: 'text-sm', gap: 'gap-3' },
  md: { ring: 'w-14 h-14', text: 'text-base', gap: 'gap-4' },
  lg: { ring: 'w-20 h-20', text: 'text-lg', gap: 'gap-5' },
};

export default function LoadingSpinner({
  message = 'در حال بارگذاری',
  fullScreen = false,
  size = 'md',
}: LoadingSpinnerProps) {
  const s = sizeMap[size];

  const content = (
    <div className={`flex flex-col items-center ${s.gap}`}>
      <div className={`relative ${s.ring}`}>
        <div className="loader-ring loader-ring-outer absolute inset-0 rounded-full" />
        <div className="loader-ring loader-ring-inner absolute inset-1 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loader-plane text-primary-blue text-lg">✈</div>
        </div>
      </div>
      <div className="text-center">
        <p className={`font-bold text-neutral-gray8 ${s.text}`}>{message}</p>
        <div className="loader-dots flex justify-center gap-1.5 mt-2">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/90 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center py-16">
      {content}
    </div>
  );
}
