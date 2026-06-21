import type { InsurancePlan } from './types';

export const INSURANCE_PLANS: InsurancePlan[] = [
  {
    id: 'basic',
    title: 'بیمه پایه',
    price: 150000,
    coverage: '۱۰,۰۰۰ یورو',
    features: ['پوشش درمانی اضطراری', 'حمل به مرکز درمانی', 'پوشش تا ۱۰,۰۰۰ یورو', 'پشتیبانی ۲۴ ساعته'],
  },
  {
    id: 'gold',
    title: 'بیمه طلایی',
    price: 350000,
    coverage: '۵۰,۰۰۰ یورو',
    popular: true,
    features: [
      'پوشش درمانی کامل',
      'لغو سفر و تأخیر پرواز',
      'گم شدن چمدان',
      'پوشش تا ۵۰,۰۰۰ یورو',
      'پشتیبانی VIP',
    ],
  },
  {
    id: 'diamond',
    title: 'بیمه الماسی',
    price: 550000,
    coverage: 'نامحدود',
    features: [
      'پوشش درمانی نامحدود',
      'لغو سفر بدون قید و شرط',
      'خسارت تأخیر و ابطال',
      'پوشش لوازم الکترونیک',
      'پشتیبانی اختصاصی',
    ],
  },
];

export function getInsurancePlan(planId: string): InsurancePlan | undefined {
  return INSURANCE_PLANS.find((p) => p.id === planId);
}
