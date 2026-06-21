'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import StepIndicator from '@/components/mobile/StepIndicator';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import SuccessAnimation from '@/components/ui/SuccessAnimation';
import { useAuth } from '@/hooks/useAuth';
import { isLoggedIn } from '@/lib/session';

const STEPS = ['شماره موبایل', 'کد تأیید', 'اطلاعات', 'تکمیل'];
const VALID_OTP = '11111'; // Accept this code for login

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [timer] = useState(120);
  const [otpError, setOtpError] = useState('');

  const returnUrl = searchParams.get('returnUrl') || '/profile';

  useEffect(() => {
    if (isLoggedIn()) router.replace(returnUrl);
  }, [router, returnUrl]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < 4) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const saveSessionAndFinish = () => {
    login({
      firstName: name.trim(),
      lastName: lastName.trim(),
      phone: phone.trim(),
      email: `${phone.trim()}@bilito.ir`,
      loggedInAt: new Date().toISOString(),
    });
    router.push(returnUrl);
  };

  const nextStep = () => {
    if (step === 1) {
      // Validate OTP code
      const enteredCode = otp.join('');
      if (enteredCode !== VALID_OTP) {
        setOtpError('کد وارد شده صحیح نیست. لطفاً 11111 را وارد کنید.');
        return;
      }
      setOtpError('');
    }
    
    if (step < 3) setStep(step + 1);
    else saveSessionAndFinish();
  };

  return (
    <PageLayout showFooter={false} mobileTitle="ورود / ثبت نام">
      <div className="max-w-md mx-auto px-4 py-4">
        <StepIndicator steps={STEPS} current={step} />

        <div className="bg-white border border-neutral-gray2 rounded-xl p-4 mt-4">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-neutral-gray8 text-center">ورود با شماره موبایل</h2>
              <p className="text-sm text-neutral-gray6 text-center">کد تأیید به شماره شما ارسال می‌شود</p>
              <Input
                label="شماره موبایل"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="09123456789"
                pattern="09[0-9]{9}"
                required
              />
              <Button fullWidth onClick={nextStep}>دریافت کد تأیید</Button>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-neutral-gray8 text-center">کد تأیید</h2>
              <p className="text-sm text-neutral-gray6 text-center">
                کد ارسال شده به {phone || '09*********'} را وارد کنید
              </p>
              <p className="text-xs text-primary-blue text-center font-medium">
                برای ورود، کد 11111 را وارد کنید
              </p>
              <div className="flex justify-center gap-2 ltr-input">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className={`w-11 h-12 text-center border rounded-lg text-lg font-bold input-focus ${
                      otpError ? 'border-status-error' : 'border-neutral-gray3'
                    }`}
                  />
                ))}
              </div>
              {otpError && (
                <p className="text-center text-sm text-status-error">{otpError}</p>
              )}
              <p className="text-center text-sm text-neutral-gray6">
                ارسال مجدد تا {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
              </p>
              <Button fullWidth onClick={nextStep}>تأیید</Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-neutral-gray8 text-center">تکمیل اطلاعات</h2>
              <Input label="نام" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="نام خانوادگی" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              <Button fullWidth onClick={nextStep}>ادامه</Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center py-4">
              <SuccessAnimation />
              <h2 className="text-lg font-bold text-neutral-gray8">ثبت نام موفق!</h2>
              <p className="text-sm text-neutral-gray6">به بیلیتو خوش آمدید</p>
              <Button fullWidth onClick={saveSessionAndFinish}>ورود به پروفایل</Button>
            </div>
          )}
        </div>

        {step < 3 && (
          <p className="text-center text-sm text-neutral-gray6 mt-6">
            با ورود،{' '}
            <Link href="/terms" className="text-primary-blue">قوانین و مقررات</Link>
            {' '}را می‌پذیرید
          </p>
        )}
      </div>
    </PageLayout>
  );
}
