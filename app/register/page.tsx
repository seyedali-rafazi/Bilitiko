'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/login';
  };

  return (
    <PageLayout showFooter={false}>
      <Hero title="ثبت نام در بیلیتو" height="h-[200px]" />
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
            <Input
              label="رمز عبور"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <Input
              label="تکرار رمز عبور"
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
            />
            <Button type="submit" fullWidth>
              <FaUser />
              <span>ثبت نام</span>
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
