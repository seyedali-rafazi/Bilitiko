interface StepIndicatorProps {
  steps: string[];
  current: number;
}

export default function StepIndicator({ steps, current }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-4">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              i <= current
                ? 'bg-primary-blue text-white'
                : 'bg-neutral-gray2 text-neutral-gray6'
            }`}
          >
            {i + 1}
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-6 h-0.5 ${i < current ? 'bg-primary-blue' : 'bg-neutral-gray3'}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
