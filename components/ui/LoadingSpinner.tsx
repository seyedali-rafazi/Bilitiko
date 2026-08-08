import BrandMark from '@/components/shared/BrandMark';

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: {
    stage: 'w-[72px] h-[72px]',
    mark: 28,
    text: 'text-sm',
    gap: 'gap-3',
    bar: 'w-28',
  },
  md: {
    stage: 'w-[104px] h-[104px]',
    mark: 40,
    text: 'text-base',
    gap: 'gap-4',
    bar: 'w-36',
  },
  lg: {
    stage: 'w-[128px] h-[128px]',
    mark: 52,
    text: 'text-lg',
    gap: 'gap-5',
    bar: 'w-44',
  },
};

export default function LoadingSpinner({
  message = 'در حال بارگذاری',
  fullScreen = false,
  size = 'md',
}: LoadingSpinnerProps) {
  const s = sizeMap[size];

  const content = (
    <div className={`flex flex-col items-center ${s.gap}`} role="status" aria-live="polite">
      <div className={`loader-stage relative ${s.stage}`}>
        <div className="loader-glow absolute inset-0" />

        <svg className="loader-ring-svg absolute inset-0" viewBox="0 0 100 100" aria-hidden>
          <circle className="loader-ring-track" cx="50" cy="50" r="44" />
          <circle className="loader-ring-progress" cx="50" cy="50" r="44" />
          <circle className="loader-ring-dash" cx="50" cy="50" r="36" />
        </svg>

        <div className="loader-orbit absolute inset-0">
          <div className="loader-orbit-plane">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
              <path
                fill="currentColor"
                d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              />
            </svg>
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loader-core shadow-lg shadow-primary-blue/20 rounded-[14px] overflow-hidden">
            <BrandMark size={s.mark} />
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className={`font-bold text-neutral-gray8 ${s.text}`}>{message}</p>
        <div className={`loader-bar mx-auto mt-3 ${s.bar}`} aria-hidden>
          <span className="loader-bar-fill" />
        </div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-white/92 backdrop-blur-sm">
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
