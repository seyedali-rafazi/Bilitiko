'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <PageLayout showFooter={false}>
      <Hero title="بازیابی رمز عبور" height="h-[200px]" />
      <div className="container mx-auto px-4 py-12 max-w-md -mt-16 relative z-10">
        <Card padding="lg">
          {sent ? (
            <div className="text-center">
              <div className="text-5xl mb-4">📧</div>
              <p className="text-neutral-gray7 mb-6">
                لینک بازیابی رمز عبور به ایمیل شما ارسال شد.
              </p>
              <Link href="/login">
                <Button fullWidth>بازگشت به ورود</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-neutral-gray6 text-sm">
                ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برای شما ارسال شود.
              </p>
              <Input
                label="ایمیل"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" fullWidth>ارسال لینک بازیابی</Button>
            </form>
          )}
        </Card>
      </div>
    </PageLayout>
  );
}
