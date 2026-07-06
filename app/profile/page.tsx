"use client";

import { Suspense, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ProfileSidebar from "./_components/ProfileSidebar";
import {
  AccountSection,
  TicketsSection,
  TripsSection,
} from "./_components/ProfileSections";
import {
  bookingToTicket,
  insuranceBookingToTicket,
} from "./_components/ticketConverters";
import { useAuth } from "@/hooks/useAuth";
import {
  useMyBookings,
  useMyInsuranceBookings,
  bookingQueryKeys,
  insuranceQueryKeys,
} from "@/hooks/queries";
import { getUser, setUser } from "@/lib/session";
import { authApi } from "@/lib/api";
import type { UserTicket } from "@/lib/types";

type ProfileTab = "account" | "tickets" | "trips";

function ProfileContent() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get("tab") as ProfileTab) || "account";
  const { user, ready, logout, requireAuth, refresh } = useAuth();
  const sessionUser = user ?? (ready ? getUser() : null);
  const queryClient = useQueryClient();

  const isAuthenticated = ready && Boolean(sessionUser);

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    refetch: refetchBookings,
  } = useMyBookings(isAuthenticated);
  const {
    data: insuranceBookings = [],
    isLoading: insuranceLoading,
    refetch: refetchInsurance,
  } = useMyInsuranceBookings(isAuthenticated);

  const ticketsLoading = bookingsLoading || insuranceLoading;

  const tickets: UserTicket[] = useMemo(
    () =>
      [
        ...bookings.map(bookingToTicket),
        ...insuranceBookings.map(insuranceBookingToTicket),
      ].sort((a, b) => b.date.localeCompare(a.date)),
    [bookings, insuranceBookings],
  );

  useEffect(() => {
    if (ready) requireAuth();
  }, [ready, requireAuth]);

  // Sync profile from API once ready
  useEffect(() => {
    if (!ready || !sessionUser) return;
    authApi
      .getProfile()
      .then((profile) => {
        const updated = {
          ...sessionUser,
          firstName: profile.first_name,
          lastName: profile.last_name,
          email: profile.email,
          phone: profile.phone ?? sessionUser.phone,
        };
        setUser(updated);
        refresh();
      })
      .catch(() => {});
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: bookingQueryKeys.myBookings() });
    queryClient.invalidateQueries({
      queryKey: insuranceQueryKeys.myBookings(),
    });
    refetchBookings();
    refetchInsurance();
  };

  if (!ready || !sessionUser) {
    return (
      <PageLayout showFooter={false} mobileTitle="پروفایل">
        <LoadingSpinner />
      </PageLayout>
    );
  }

  const tabTitles: Record<ProfileTab, { title: string; subtitle: string }> = {
    account: {
      title: "پروفایل کاربری",
      subtitle: "مدیریت حساب، بلیط‌ها و سفرها",
    },
    tickets: {
      title: "بلیط‌ها و بیمه‌های من",
      subtitle: "لیست بلیط‌های خریداری شده",
    },
    trips: { title: "سفرهای من", subtitle: "لیست بلیط‌های رزرو شده" },
  };

  return (
    <PageLayout showFooter={false} mobileTitle="پروفایل" isLoggedIn>
      <PageHeader
        title={tabTitles[tab].title}
        subtitle={tabTitles[tab].subtitle}
      />

      <div className="container mx-auto px-4 pb-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6">
          <ProfileSidebar
            user={sessionUser}
            ticketCount={tickets.length}
            activeTab={tab}
            onLogout={logout}
          />

          <div className="flex-1 min-w-0 space-y-6">
            {tab === "account" && (
              <AccountSection
                user={sessionUser}
                tickets={tickets}
                ticketsLoading={ticketsLoading}
              />
            )}
            {tab === "tickets" && (
              <TicketsSection
                tickets={tickets}
                loading={ticketsLoading}
                onRefresh={handleRefresh}
              />
            )}
            {tab === "trips" && (
              <TripsSection
                tickets={tickets}
                loading={ticketsLoading}
                onRefresh={handleRefresh}
              />
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <PageLayout showFooter={false} mobileTitle="پروفایل">
          <LoadingSpinner />
        </PageLayout>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
