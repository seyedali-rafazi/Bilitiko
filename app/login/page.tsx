"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import PageLayout from "@/components/layout/PageLayout";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import SuccessAnimation from "@/components/ui/SuccessAnimation";
import { useAuth } from "@/hooks/useAuth";
import { isLoggedIn } from "@/lib/session";
import { authApi } from "@/lib/api";
import { useToast } from "@/components/providers/ToastProvider";
import { toFarsiError } from "@/lib/error-messages";
import { sanitizeReturnUrl } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithApi } = useAuth();
  const { success, error: toastError, info } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const returnUrl = sanitizeReturnUrl(
    searchParams.get("returnUrl"),
    "/profile",
  );

  useEffect(() => {
    if (isLoggedIn()) router.replace(returnUrl);
  }, [router, returnUrl]);

  // Show a welcome-back toast after successful registration redirect
  useEffect(() => {
    if (searchParams.get("registered") === "1") {
      info("ثبت نام موفق! لطفاً با اطلاعات خود وارد شوید.");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi.login(email.trim(), password);
      loginWithApi(
        {
          firstName: res.user?.first_name ?? "",
          lastName: res.user?.last_name ?? "",
          phone: res.user?.phone ?? "",
          email: res.user?.email ?? email.trim(),
          loggedInAt: new Date().toISOString(),
        },
        { access: res.access_token, refresh: res.refresh_token },
      );
      success("خوش آمدید! ورود با موفقیت انجام شد.");
      setDone(true);
      setTimeout(() => router.push(returnUrl), 1200);
    } catch (err: unknown) {
      toastError(toFarsiError(err, "خطا در ورود. لطفاً دوباره تلاش کنید."));
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <PageLayout showFooter={false} mobileTitle="ورود">
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <SuccessAnimation />
          <h2 className="text-lg font-bold text-neutral-gray8 mt-4">
            ورود موفق!
          </h2>
          <p className="text-sm text-neutral-gray6">
            در حال انتقال به پروفایل…
          </p>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout showFooter={false} mobileTitle="ورود / ثبت نام">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white border border-neutral-gray2 rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-bold text-neutral-gray8 text-center">
            ورود به حساب کاربری
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="ایمیل"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              required
            />
            <Input
              label="رمز عبور"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button type="submit" fullWidth disabled={loading}>
              {loading ? "در حال ورود…" : "ورود"}
            </Button>
          </form>

          <div className="pt-4 border-t border-neutral-gray2 text-center space-y-2">
            <p className="text-sm text-neutral-gray6">
              حساب کاربری ندارید؟{" "}
              <Link
                href="/register"
                className="text-primary-blue font-bold hover:underline"
              >
                ثبت نام
              </Link>
            </p>
            <p className="text-sm text-neutral-gray6">
              <Link
                href="/forgot-password"
                className="text-primary-blue hover:underline"
              >
                فراموشی رمز عبور
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-neutral-gray6 mt-6">
          با ورود،{" "}
          <Link href="/terms" className="text-primary-blue">
            قوانین و مقررات
          </Link>{" "}
          را می‌پذیرید
        </p>
      </div>
    </PageLayout>
  );
}
