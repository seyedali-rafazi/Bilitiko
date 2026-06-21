'use client';

import Link from 'next/link';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaEnvelope, FaPhone, FaPlane, FaShieldAlt, FaSignOutAlt, FaSuitcase, FaTicketAlt } from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import Badge from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { Button } from '@/components/ui/shadcn/button';
import { Separator } from '@/components/ui/shadcn/separator';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { getTickets, getUser, getUserDisplayName, getUserInitials } from '@/lib/session';
import { MOCK_TRIPS } from '@/lib/mock-data';
import type { UserTicket } from '@/lib/types';

type ProfileTab = 'account' | 'tickets' | 'trips';

const statusMap = {
  confirmed: { label: 'تأیید شده', className: 'bg-status-successBg text-status-successDark', variant: 'success' as const },
  pending: { label: 'در انتظار', className: 'bg-status-warningBg text-status-warning', variant: 'warning' as const },
  cancelled: { label: 'لغو شده', className: 'bg-neutral-gray1 text-neutral-gray6', variant: 'neutral' as const },
};

function ProfileContent() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get('tab') as ProfileTab) || 'account';
  const { user, ready, logout, requireAuth } = useAuth();
  const sessionUser = user ?? (ready ? getUser() : null);
  const tickets = ready ? getTickets() : [];

  useEffect(() => {
    if (ready) requireAuth();
  }, [ready, requireAuth]);

  if (!ready || !sessionUser) {
    return (
      <PageLayout showFooter={false} mobileTitle="پروفایل">
        <LoadingSpinner />
      </PageLayout>
    );
  }

  const tabTitles: Record<ProfileTab, { title: string; subtitle: string }> = {
    account: { title: 'پروفایل کاربری', subtitle: 'مدیریت حساب، بلیط‌ها و سفرها' },
    tickets: { title: 'بلیط‌ها و بیمه‌های من', subtitle: 'لیست بلیط‌های خریداری شده' },
    trips: { title: 'سفرهای من', subtitle: 'لیست بلیط‌های رزرو شده' },
  };

  return (
    <PageLayout showFooter={false} mobileTitle="پروفایل" isLoggedIn>
      <PageHeader title={tabTitles[tab].title} subtitle={tabTitles[tab].subtitle} />

      <div className="container mx-auto px-4 pb-8 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-6">
          <ProfileSidebar user={sessionUser} ticketCount={tickets.length} activeTab={tab} onLogout={logout} />

          <div className="flex-1 min-w-0 space-y-6">
            {tab === 'account' && <AccountSection user={sessionUser} tickets={tickets} />}
            {tab === 'tickets' && <TicketsSection tickets={tickets} />}
            {tab === 'trips' && <TripsSection />}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <PageLayout showFooter={false} mobileTitle="پروفایل">
        <LoadingSpinner />
      </PageLayout>
    }>
      <ProfileContent />
    </Suspense>
  );
}

function AccountSection({
  user,
  tickets,
}: {
  user: NonNullable<ReturnType<typeof useAuth>['user']>;
  tickets: UserTicket[];
}) {
  return (
    <>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-bold text-neutral-gray8 mb-4">اطلاعات حساب</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <InfoRow label="نام" value={user.firstName} />
            <InfoRow label="نام خانوادگی" value={user.lastName} />
            <InfoRow label="موبایل" value={user.phone} />
            <InfoRow label="ایمیل" value={user.email} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-neutral-gray8">آخرین بلیط‌ها</h2>
            <Link href="/profile?tab=tickets">
              <Button variant="outline" size="sm">مشاهده همه</Button>
            </Link>
          </div>

          {tickets.length === 0 ? (
            <div className="text-center py-10">
              <FaTicketAlt className="text-4xl text-neutral-gray4 mx-auto mb-3" />
              <p className="text-neutral-gray6 mb-4">هنوز بلیط یا بیمه‌نامه‌ای ندارید</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/"><Button size="sm">جستجوی پرواز</Button></Link>
                <Link href="/insurance"><Button size="sm" variant="secondary">خرید بیمه</Button></Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.slice(0, 5).map((ticket) => (
                <TicketRow key={ticket.id} ticket={ticket} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

function TicketsSection({ tickets }: { tickets: UserTicket[] }) {
  return (
    <Card>
      <CardContent className="p-6">
        {tickets.length === 0 ? (
          <div className="text-center py-16">
            <FaTicketAlt className="text-5xl text-neutral-gray4 mx-auto mb-4" />
            <p className="text-neutral-gray6 mb-6">بلیط یا بیمه‌نامه‌ای ندارید</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/"><Button>جستجوی پرواز</Button></Link>
              <Link href="/insurance"><Button variant="secondary">خرید بیمه</Button></Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TripsSection() {
  return (
    <Card>
      <CardContent className="p-6">
        {MOCK_TRIPS.length === 0 ? (
          <div className="text-center py-16">
            <FaSuitcase className="text-5xl text-neutral-gray4 mx-auto mb-4" />
            <p className="text-xl text-neutral-gray6 mb-6">هنوز سفری رزرو نکرده‌اید</p>
            <Link href="/">
              <Button>جستجوی پرواز</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {MOCK_TRIPS.map((trip) => (
              <div key={trip.id} className="bg-white border border-neutral-gray2 rounded-xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary-tint1 p-3 rounded-lg">
                      <FaPlane className="text-primary-blue text-xl -rotate-45" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-gray8">
                        {trip.from} به {trip.to}
                      </h3>
                      <p className="text-neutral-gray6 text-sm">
                        {trip.airline} • {trip.date}
                      </p>
                      <p className="text-neutral-gray5 text-xs mt-1">کد: {trip.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={statusMap[trip.status].variant}>
                      {statusMap[trip.status].label}
                    </Badge>
                    <span className="font-bold text-primary-blue">
                      {trip.price.toLocaleString('fa-IR')} تومان
                    </span>
                    <Button variant="outline" size="sm">جزئیات</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ProfileSidebar({
  user,
  ticketCount,
  activeTab,
  onLogout,
}: {
  user: NonNullable<ReturnType<typeof useAuth>['user']>;
  ticketCount: number;
  activeTab: ProfileTab;
  onLogout: () => void;
}) {
  const initials = getUserInitials(user);
  const displayName = getUserDisplayName(user);

  return (
    <aside className="w-full lg:w-[280px] shrink-0">
      <Card className="sticky top-4">
        <CardContent className="p-6 text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-primary-shade1 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
            {initials}
          </div>
          <h2 className="text-xl font-bold text-neutral-gray8">{displayName}</h2>
          <p className="text-sm text-muted-foreground mt-1">{user.phone}</p>

          <Separator className="my-5" />

          <nav className="space-y-1 text-right">
            <SidebarLink href="/profile" icon={<FaEnvelope />} label="اطلاعات کاربری" active={activeTab === 'account'} />
            <SidebarLink href="/profile?tab=tickets" icon={<FaTicketAlt />} label={`بلیط‌ها (${ticketCount.toLocaleString('fa-IR')})`} active={activeTab === 'tickets'} />
            <SidebarLink href="/profile?tab=trips" icon={<FaSuitcase />} label="سفرهای من" active={activeTab === 'trips'} />
            <SidebarLink href="/insurance" icon={<FaShieldAlt />} label="خرید بیمه" />
          </nav>

          <Separator className="my-5" />

          <div className="space-y-2 text-sm text-muted-foreground text-right">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-primary shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-primary shrink-0" />
              <span>{user.phone}</span>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-5 text-status-error border-status-error/30 hover:bg-status-errorBg" onClick={onLogout}>
            <FaSignOutAlt />
            خروج از حساب
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
        active ? 'bg-primary-tint1 text-primary font-bold' : 'text-neutral-gray8 hover:bg-muted'
      }`}
    >
      <span className="text-primary">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted rounded-lg p-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-semibold text-neutral-gray8">{value || '—'}</p>
    </div>
  );
}

function TicketRow({ ticket }: { ticket: UserTicket }) {
  const status = statusMap[ticket.status];
  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-lg border border-neutral-gray2 bg-neutral-gray1/50">
      <div className="min-w-0">
        <p className="font-bold text-sm text-neutral-gray8 truncate">{ticket.title}</p>
        <p className="text-xs text-muted-foreground truncate">{ticket.subtitle}</p>
      </div>
      <span className={`text-[10px] px-2 py-1 rounded-full shrink-0 font-semibold ${status.className}`}>
        {status.label}
      </span>
    </div>
  );
}

function TicketCard({ ticket }: { ticket: UserTicket }) {
  const isFlight = ticket.type === 'flight';

  return (
    <div className="bg-white border border-neutral-gray2 rounded-xl p-4 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2 rounded-lg ${isFlight ? 'bg-primary-tint1' : 'bg-status-successBg'}`}>
          {isFlight ? (
            <FaPlane className="text-primary-blue -rotate-45" />
          ) : (
            <FaShieldAlt className="text-status-successDark" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-neutral-gray8">{ticket.title}</h3>
          <p className="text-xs text-neutral-gray6 mt-0.5">{ticket.subtitle}</p>
          <p className="text-[11px] text-neutral-gray5 mt-1">کد پیگیری: {ticket.trackingCode}</p>
        </div>
        <Badge variant={statusMap[ticket.status].variant}>{statusMap[ticket.status].label}</Badge>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-neutral-gray2">
        <span className="font-bold text-primary-blue text-sm">
          {ticket.price.toLocaleString('fa-IR')} تومان
        </span>
        <Button variant="outline" size="sm">دانلود</Button>
      </div>
    </div>
  );
}
