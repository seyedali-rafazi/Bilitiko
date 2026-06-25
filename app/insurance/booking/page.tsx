'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PageLayout from '@/components/layout/PageLayout';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import PersianDatePicker from '@/components/ui/PersianDatePicker';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { getInsurancePlan } from '@/lib/insurance-data';
import { getUser, setInsuranceBooking } from '@/lib/session';
import type { InsurancePlan } from '@/lib/types';

function getSelectedPlan(planId: string): InsurancePlan | undefined {
  // Try the plan stored when the user confirmed on the insurance listing page.
  // This handles API plans whose _id is a number (e.g. "1") which don't exist
  // in the static INSURANCE_PLANS list.
  try {
    const raw = localStorage.getItem('bilito-selected-insurance-plan');
    if (raw) {
      const stored: InsurancePlan = JSON.parse(raw);
      if (String(stored._id) === String(planId)) return stored;
    }
  } catch {
    // ignore parse errors
  }
  return getInsurancePlan(planId);
}

function InsuranceBookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get('plan') || 'gold';
  const plan = getSelectedPlan(planId);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    nationalId: '',
    birthDate: '',
    destination: '',
    startDate: '',
    endDate: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setForm((f) => ({
        ...f,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        email: user.email,
      }));
    }
  }, []);

  useEffect(() => {
    if (!plan) router.replace('/insurance');
  }, [plan, router]);

  if (!plan) {
    return (
      <PageLayout showFooter={false} mobileTitle="اطلاعات بیمه">
        <LoadingSpinner />
      </PageLayout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInsuranceBooking({ planId, ...form });
    router.push(`/insurance/payment?plan=${planId}`);
  };

  return (
    <PageLayout showFooter={false} mobileTitle="اطلاعات بیمه">
      <div className="max-w-lg mx-auto px-4 py-4">
        <Card className="mb-4">
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">طرح انتخابی</p>
            <p className="font-bold text-primary text-lg">{plan.title}</p>
            <p className="text-sm text-neutral-gray6">پوشش {plan.coverage}</p>
            <p className="font-bold text-neutral-gray8 mt-2">
              {plan.price.toLocaleString('fa-IR')} تومان
            </p>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="نام" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
          <Input label="نام خانوادگی" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
          <Input label="کد ملی" value={form.nationalId} onChange={(e) => setForm({ ...form, nationalId: e.target.value })} required />
          <PersianDatePicker
            label="تاریخ تولد"
            value={form.birthDate}
            onChange={(value) => setForm({ ...form, birthDate: value })}
            required
            maxDate={new Date().toISOString().split('T')[0]}
          />
          <Input label="مقصد سفر" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} placeholder="مثلاً دبی" required />
          <div className="grid grid-cols-2 gap-3">
            <PersianDatePicker
              label="شروع پوشش"
              value={form.startDate}
              onChange={(value) => setForm({ ...form, startDate: value })}
              required
            />
            <PersianDatePicker
              label="پایان پوشش"
              value={form.endDate}
              onChange={(value) => setForm({ ...form, endDate: value })}
              required
              minDate={form.startDate}
            />
          </div>
          <Input label="موبایل" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <Input label="ایمیل" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />

          <Button type="submit" fullWidth>ادامه و پرداخت</Button>
        </form>
      </div>
    </PageLayout>
  );
}

export default function InsuranceBookingPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <InsuranceBookingContent />
    </Suspense>
  );
}
