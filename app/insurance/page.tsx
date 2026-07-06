"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCheckCircle, FaShieldAlt } from "react-icons/fa";
import PageLayout from "@/components/layout/PageLayout";
import Button from "@/components/ui/Button";
import BottomSheet from "@/components/mobile/BottomSheet";
import Modal from "@/components/ui/Modal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { useInsurancePlans } from "@/hooks/queries";
import { isLoggedIn } from "@/lib/session";
import type { InsurancePlan } from "@/lib/types";

export default function InsurancePage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<InsurancePlan | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const { data: plans = [], isLoading } = useInsurancePlans();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const handleSelect = (plan: InsurancePlan) => {
    if (!isLoggedIn()) {
      router.push(`/login?returnUrl=/insurance`);
      return;
    }
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const confirmPlan = () => {
    if (!selectedPlan) return;
    setModalOpen(false);
    localStorage.setItem(
      "bilito-selected-insurance-plan",
      JSON.stringify(selectedPlan),
    );
    router.push(`/insurance/booking?plan=${selectedPlan._id}`);
  };

  if (isLoading) {
    return (
      <PageLayout mobileTitle="بیمه مسافرتی">
        <LoadingSpinner message="در حال بارگذاری پلن‌ها…" />
      </PageLayout>
    );
  }

  return (
    <PageLayout mobileTitle="بیمه مسافرتی">
      <div className="lg:hidden px-4 py-4 bg-primary-tint1">
        <h2 className="text-lg font-bold text-neutral-gray8 mb-2">
          بیمه مسافرتی بیلیتیکو
        </h2>
        <p className="text-sm text-neutral-gray6">
          سفر خود را با خیال راحت آغاز کنید
        </p>
      </div>

      <div className="hidden lg:block">
        <div className="relative h-[200px] bg-gradient-to-l from-[#1C6FB9] to-transparent flex items-center justify-center">
          <div className="text-center text-white">
            <FaShieldAlt className="text-4xl mx-auto mb-3 opacity-90" />
            <h1 className="text-3xl font-bold">بیمه مسافرتی</h1>
            <p className="text-white/80 mt-2">
              پوشش کامل برای سفرهای داخلی و خارجی
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-lg lg:max-w-[1224px] mx-auto px-4 py-6">
        <div className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0">
          {plans.map((plan) => (
            <Card
              key={plan._id}
              className={
                plan.popular ? "border-primary border-2 relative shadow-md" : ""
              }
            >
              <CardContent className="p-6">
                {plan.popular && (
                  <span className="absolute -top-3 right-4 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                    پرفروش
                  </span>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <FaShieldAlt
                    className={
                      plan.popular ? "text-primary" : "text-neutral-gray6"
                    }
                  />
                  <h3 className="text-lg font-bold text-neutral-gray8">
                    {plan.title}
                  </h3>
                </div>
                <p className="text-sm text-neutral-gray6 mb-4">
                  پوشش تا {plan.coverage}
                </p>

                <ul className="space-y-2 mb-5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-neutral-gray7"
                    >
                      <FaCheckCircle className="text-status-success shrink-0 mt-0.5 text-xs" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-2xl font-bold text-primary mb-4">
                  {plan.price.toLocaleString("fa-IR")}
                  <span className="text-sm font-normal text-neutral-gray6 mr-1">
                    تومان
                  </span>
                </p>

                <Button
                  fullWidth
                  variant={plan.popular ? "primary" : "secondary"}
                  onClick={() => handleSelect(plan)}
                >
                  انتخاب و خرید
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-neutral-gray6">
          قبلاً بیمه خریده‌اید؟{" "}
          <Link
            href="/profile?tab=tickets"
            className="text-primary font-medium"
          >
            مشاهده بلیط‌های من
          </Link>
        </p>
      </div>

      {isDesktop ? (
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="تأیید انتخاب بیمه"
        >
          {selectedPlan && (
            <PlanConfirmContent plan={selectedPlan} onConfirm={confirmPlan} />
          )}
        </Modal>
      ) : (
        <BottomSheet
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="تأیید انتخاب بیمه"
        >
          {selectedPlan && (
            <PlanConfirmContent plan={selectedPlan} onConfirm={confirmPlan} />
          )}
        </BottomSheet>
      )}
    </PageLayout>
  );
}

function PlanConfirmContent({
  plan,
  onConfirm,
}: {
  plan: InsurancePlan;
  onConfirm: () => void;
}) {
  return (
    <>
      <div className="bg-primary-tint1 rounded-xl p-4 mb-4">
        <p className="font-bold text-neutral-gray8">{plan.title}</p>
        <p className="text-sm text-neutral-gray6 mt-1">پوشش {plan.coverage}</p>
        <p className="text-lg font-bold text-primary mt-2">
          {plan.price.toLocaleString("fa-IR")} تومان
        </p>
      </div>
      <Button fullWidth onClick={onConfirm}>
        ادامه و ثبت اطلاعات
      </Button>
    </>
  );
}
