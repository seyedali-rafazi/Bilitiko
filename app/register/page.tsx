'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { authApi } from '@/lib/api';
import { useToast } from '@/components/providers/ToastProvider';
import { toFarsiError } from '@/lib/error-messages';

export default function RegisterPage() {
  const router = useRouter();
  const { success, error: toastError } = useToast();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side password validations → show toast immediately
    if (form.password.length < 8) {
      toastError('رمز عبور باید حداقل ۸ کاراکتر داشته باشد. لطفاً رمز قوی‌تری انتخاب کنید.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      toastError('رمز عبور و تکرار آن یکسان نیستند.');
      return;
    }

    setLoading(true);
    try {
      await authApi.register({
        email: form.email.trim(),
        password: form.password,
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        phone: form.phone.trim(),
      });
      success('ثبت نام با موفقیت انجام شد! در حال انتقال به صفحه ورود…');
      setTimeout(() => router.push('/login?returnUrl=/profile&registered=1'), 1500);
    } catch (err: unknown) {
      toastError(toFarsiError(err, 'خطا در ثبت نام. لطفاً دوباره تلاش کنید.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout showFooter={false}>
      <Hero title="ثبت نام در بیلیتیکو" height="h-[200px]" />
      <div className="container mx-auto px-4 py-12 max-w-lg -mt-16 relative z-10">
        <Card padding="lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="نام"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
              />
              <Input
                label="نام خانوادگی"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </div>
            <Input
              label="ایمیل"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="شماره موبایل"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              pattern="09[0-9]{9}"
              required
            />
            <div className="space-y-1">
              <Input
                label="رمز عبور"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <p className="text-xs text-neutral-gray5 pr-1">حداقل ۸ کاراکتر</p>
            </div>
            <Input
              label="تکرار رمز عبور"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />

            <Button type="submit" fullWidth disabled={loading}>
              <FaUser />
              <span>{loading ? 'در حال ثبت نام…' : 'ثبت نام'}</span>
            </Button>
          </form>
          <div className="mt-6 pt-6 border-t border-neutral-gray2 text-center">
            <p className="text-neutral-gray6">
              قبلاً ثبت نام کرده‌اید؟{' '}
              <Link href="/login" className="text-primary-blue font-bold hover:underline">
                ورود
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
