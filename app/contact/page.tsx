'use client';

import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import Hero from '@/components/layout/Hero';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <PageLayout mobileTitle="تماس با ما">
      <Hero title="تماس با ما" subtitle="ما همیشه در کنار شما هستیم" height="h-[240px]" />

      <div className="container mx-auto px-4 py-12 max-w-[1224px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card padding="lg">
            <h2 className="text-xl font-bold text-neutral-gray8 mb-6">ارسال پیام</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="نام و نام خانوادگی"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                label="ایمیل"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <Input
                label="موضوع"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />
              <div className="space-y-2">
                <label className="block text-sm font-bold text-neutral-gray8">پیام</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 border border-neutral-gray3 rounded-lg input-focus min-h-[120px]"
                  required
                />
              </div>
              <Button type="submit" fullWidth>ارسال پیام</Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card padding="lg">
              <div className="flex items-center gap-4 mb-4">
                <FaPhone className="text-primary-blue text-2xl" />
                <div>
                  <h3 className="font-bold text-neutral-gray8">تلفن پشتیبانی</h3>
                  <p className="text-neutral-gray6">021-4045</p>
                </div>
              </div>
            </Card>
            <Card padding="lg">
              <div className="flex items-center gap-4 mb-4">
                <FaEnvelope className="text-primary-blue text-2xl" />
                <div>
                  <h3 className="font-bold text-neutral-gray8">ایمیل</h3>
                  <p className="text-neutral-gray6">support@bilito.ir</p>
                </div>
              </div>
            </Card>
            <Card padding="lg">
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-primary-blue text-2xl" />
                <div>
                  <h3 className="font-bold text-neutral-gray8">آدرس</h3>
                  <p className="text-neutral-gray6">
                    تهران، میدان آزادی، خیابان آزادی، خیابان جیحون، طوس غربی
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
