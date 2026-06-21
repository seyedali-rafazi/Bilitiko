'use client';

export default function SuccessAnimation() {
  return (
    <div className="flex justify-center mb-4">
      <div className="success-checkmark">
        <svg className="success-checkmark__circle" viewBox="0 0 52 52">
          <circle className="success-checkmark__circle-bg" cx="26" cy="26" r="25" fill="none" />
          <circle className="success-checkmark__circle-stroke" cx="26" cy="26" r="25" fill="none" />
        </svg>
        <svg className="success-checkmark__check" viewBox="0 0 52 52">
          <path className="success-checkmark__check-path" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
      </div>
    </div>
  );
}
