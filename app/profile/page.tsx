'use client';

import Link from 'next/link';
import { useEffect, useCallback, Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  FaEnvelope, FaPhone, FaPlane, FaShieldAlt, FaSignOutAlt,
  FaSuitcase, FaTicketAlt, FaBus, FaTrain, FaSync,
} from 'react-icons/fa';
import PageLayout from '@/components/layout/PageLayout';
import PageHeader from '@/components/layout/PageHeader';
import Badge from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { Button } from '@/components/ui/shadcn/button';
import { Separator } from '@/components/ui/shadcn/separator';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';
import { getUser, getUserDisplayName, getUserInitials, setUser } from '@/lib/session';
import { downloadTicketPDF, type TicketData } from '@/lib/pdf-generator';
import { format as formatJalali } from 'date-fns-jalali';
import type { UserTicket } from '@/lib/types';
import { authApi, bookingsApi, insuranceApi, type ApiBookingResponse, type ApiInsuranceBookingResponse } from '@/lib/api';

type ProfileTab = 'account' | 'tickets' | 'trips';

const statusMap = {
  confirmed: { label: 'تأیید شده', className: 'bg-status-successBg text-status-successDark', variant: 'success' as const },
  pending: { label: 'در انتظار', className: 'bg-status-warningBg text-status-warning', variant: 'warning' as const },
  cancelled: { label: 'لغو شده', className: 'bg-neutral-gray1 text-neutral-gray6', variant: 'neutral' as const },
};

// ─── API → UserTicket converters ─────────────────────────────────────────────

const VALID_STATUSES = new Set<string>(['confirmed', 'pending', 'cancelled']);

function safePrice(raw: number | string | undefined | null): number {
  if (raw == null) return 0;
  const n = typeof raw === 'number' ? raw : parseFloat(String(raw));
  return isNaN(n) ? 0 : n;
}

function safeStatus(raw: string | undefined | null): UserTicket['status'] {
  const s = (raw ?? '').toLowerCase();
  return VALID_STATUSES.has(s) ? (s as UserTicket['status']) : 'confirmed';
}

function bookingToTicket(b: ApiBookingResponse): UserTicket {
  const passenger = b.passengers?.[0];
  const passengerName = passenger ? `${passenger.first_name} ${passenger.last_name}` : '';
  const type = (b.booking_type ?? 'flight') as UserTicket['type'];
  const titleMap: Record<string, string> = {
    flight: 'بلیط پرواز', bus: 'بلیط اتوبوس', train: 'بلیط قطار',
  };

  return {
    _id: String(b._id ?? b.tracking_code),
    type,
    title: titleMap[type] ?? 'بلیط',
    subtitle: passengerName,
    date: (b.created_at ?? '').slice(0, 10),
    price: safePrice(b.total_price),
    status: safeStatus(b.status),
    trackingCode: b.tracking_code ?? '',
    seatNumbers: b.seat_numbers,
  };
}

function insuranceBookingToTicket(b: ApiInsuranceBookingResponse): UserTicket {
  return {
    _id: b.tracking_code,
    type: 'insurance',
    title: b.plan_title ?? 'بیمه مسافرتی',
    subtitle: `${b.first_name ?? ''} ${b.last_name ?? ''} • ${b.destination ?? ''}`.trim(),
    date: b.start_date ?? '',
    price: safePrice(b.plan_price),
    status: 'confirmed',
    trackingCode: b.tracking_code ?? '',
    planId: b.plan_id,
    coverage: b.plan_coverage,
    destination: b.destination,
  };
}

// ─── Profile page ─────────────────────────────────────────────────────────────

function ProfileContent() {
  const searchParams = useSearchParams();
  const tab = (searchParams.get('tab') as ProfileTab) || 'account';
  const { user, ready, logout, requireAuth, refresh } = useAuth();
  const sessionUser = user ?? (ready ? getUser() : null);

  const [tickets, setTickets] = useState<UserTicket[]>([]);
  const [ticketsLoading, setTicketsLoading] = useState(true);

  useEffect(() => {
    if (ready) requireAuth();
  }, [ready, requireAuth]);

  // Sync profile from API
  useEffect(() => {
    if (!ready || !sessionUser) return;
    authApi.getProfile().then((profile) => {
      const updated = {
        ...sessionUser,
        firstName: profile.first_name,
        lastName: profile.last_name,
        email: profile.email,
        phone: profile.phone ?? sessionUser.phone,
      };
      setUser(updated);
      refresh();
    }).catch(() => {});
  }, [ready]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load tickets from backend
  const loadTickets = useCallback(async () => {
    setTicketsLoading(true);
    try {
      const [bookings, insuranceBookings] = await Promise.all([
        bookingsApi.getMyBookings(),
        insuranceApi.getMyBookings(),
      ]);
      const all: UserTicket[] = [
        ...bookings.map(bookingToTicket),
        ...insuranceBookings.map(insuranceBookingToTicket),
      ].sort((a, b) => b.date.localeCompare(a.date));
      setTickets(all);
    } catch {
      // API unreachable — show empty list
      setTickets([]);
    } finally {
      setTicketsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (ready && sessionUser) loadTickets();
  }, [ready, sessionUser, loadTickets]);

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
          <ProfileSidebar
            user={sessionUser}
            ticketCount={tickets.length}
            activeTab={tab}
            onLogout={logout}
          />

          <div className="flex-1 min-w-0 space-y-6">
            {tab === 'account' && (
              <AccountSection user={sessionUser} tickets={tickets} ticketsLoading={ticketsLoading} />
            )}
            {tab === 'tickets' && (
              <TicketsSection tickets={tickets} loading={ticketsLoading} onRefresh={loadTickets} />
            )}
            {tab === 'trips' && (
              <TripsSection tickets={tickets} loading={ticketsLoading} onRefresh={loadTickets} />
            )}
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

// ─── Account section ──────────────────────────────────────────────────────────

function AccountSection({
  user,
  tickets,
  ticketsLoading,
}: {
  user: NonNullable<ReturnType<typeof useAuth>['user']>;
  tickets: UserTicket[];
  ticketsLoading: boolean;
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

          {ticketsLoading ? (
            <div className="py-8"><LoadingSpinner message="در حال بارگذاری..." /></div>
          ) : tickets.length === 0 ? (
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
                <TicketRow key={ticket._id} ticket={ticket} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

// ─── Tickets section ──────────────────────────────────────────────────────────

function TicketsSection({
  tickets,
  loading,
  onRefresh,
}: {
  tickets: UserTicket[];
  loading: boolean;
  onRefresh: () => void;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-neutral-gray8">همه بلیط‌ها و بیمه‌ها</h2>
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
            <FaSync className={loading ? 'animate-spin' : ''} />
            <span className="mr-1">بروزرسانی</span>
          </Button>
        </div>

        {loading ? (
          <div className="py-12"><LoadingSpinner message="در حال بارگذاری..." /></div>
        ) : tickets.length === 0 ? (
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
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Trips section ────────────────────────────────────────────────────────────

function TripsSection({
  tickets,
  loading,
  onRefresh,
}: {
  tickets: UserTicket[];
  loading: boolean;
  onRefresh: () => void;
}) {
  const travelTickets = tickets.filter(
    (t) => t.type === 'flight' || t.type === 'bus' || t.type === 'train'
  );

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-neutral-gray8">سفرهای من</h2>
          <Button variant="outline" size="sm" onClick={onRefresh} disabled={loading}>
            <FaSync className={loading ? 'animate-spin' : ''} />
            <span className="mr-1">بروزرسانی</span>
          </Button>
        </div>

        {loading ? (
          <div className="py-12"><LoadingSpinner message="در حال بارگذاری..." /></div>
        ) : travelTickets.length === 0 ? (
          <div className="text-center py-16">
            <FaSuitcase className="text-5xl text-neutral-gray4 mx-auto mb-4" />
            <p className="text-xl text-neutral-gray6 mb-6">هنوز سفری رزرو نکرده‌اید</p>
            <Link href="/"><Button>جستجوی پرواز</Button></Link>
          </div>
        ) : (
          <div className="space-y-4">
            {travelTickets.map((ticket) => (
              <div key={ticket._id} className="bg-white border border-neutral-gray2 rounded-xl p-4 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary-tint1 p-3 rounded-lg">
                      {ticket.type === 'flight' && <FaPlane className="text-primary-blue text-xl -rotate-45" />}
                      {ticket.type === 'bus' && <FaBus className="text-primary-blue text-xl" />}
                      {ticket.type === 'train' && <FaTrain className="text-primary-blue text-xl" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-neutral-gray8">{ticket.title}</h3>
                      <p className="text-neutral-gray6 text-sm">{ticket.subtitle}</p>
                      <p className="text-neutral-gray5 text-xs mt-1">کد: {ticket.trackingCode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={statusMap[ticket.status].variant}>
                      {statusMap[ticket.status].label}
                    </Badge>
                    <span className="font-bold text-primary-blue">
                      {ticket.price.toLocaleString('fa-IR')} تومان
                    </span>
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

// ─── Sidebar ──────────────────────────────────────────────────────────────────

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
            <SidebarLink
              href="/profile?tab=tickets"
              icon={<FaTicketAlt />}
              label={`بلیط‌ها (${ticketCount.toLocaleString('fa-IR')})`}
              active={activeTab === 'tickets'}
            />
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

          <Button
            variant="outline"
            className="w-full mt-5 text-status-error border-status-error/30 hover:bg-status-errorBg"
            onClick={onLogout}
          >
            <FaSignOutAlt />
            خروج از حساب
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}

// ─── Small components ─────────────────────────────────────────────────────────

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
  const status = statusMap[ticket.status] ?? statusMap.confirmed;
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
  const [isDownloading, setIsDownloading] = useState(false);
  const user = getUser();

  const getTicketIcon = () => {
    switch (ticket.type) {
      case 'flight':
        return { icon: <FaPlane className="text-primary-blue -rotate-45" />, bg: 'bg-primary-tint1' };
      case 'bus':
        return { icon: <FaBus className="text-primary-blue" />, bg: 'bg-primary-tint1' };
      case 'train':
        return { icon: <FaTrain className="text-primary-blue" />, bg: 'bg-primary-tint1' };
      case 'insurance':
        return { icon: <FaShieldAlt className="text-status-successDark" />, bg: 'bg-status-successBg' };
      default:
        return { icon: <FaTicketAlt className="text-primary-blue" />, bg: 'bg-primary-tint1' };
    }
  };

  const handleDownload = () => {
    if (ticket.type === 'insurance') {
      alert('دانلود بیمه‌نامه به زودی فعال می‌شود');
      return;
    }

    setIsDownloading(true);
    try {
      const ticketData: TicketData = {
        trackingCode: ticket.trackingCode,
        bookingDate: formatJalali(new Date(), 'yyyy/MM/dd - HH:mm'),
        passengers: [
          {
            firstName: user?.firstName || 'مسافر',
            lastName: user?.lastName || '',
            nationalId: '',
          },
        ],
        contact: {
          email: user?.email || '',
          phone: user?.phone || '',
        },
        pricing: {
          basePrice: ticket.price,
          tax: Math.round(ticket.price * 0.09),
          serviceFee: 50000,
          total: ticket.price,
        },
      };

      if (ticket.type === 'flight') {
        ticketData.flight = {
          flightNumber: ticket.trackingCode,
          airline: ticket.airline || 'ایران ایر',
          origin: ticket.from || 'تهران',
          destination: ticket.to || 'مشهد',
          departureDate: ticket.date,
          departureTime: ticket.departureTime || '14:30',
          arrivalTime: ticket.arrivalTime || '16:00',
          duration: '',
          class: 'اقتصادی',
        };
      } else if (ticket.type === 'bus' || ticket.type === 'train') {
        ticketData.transport = {
          type: ticket.type,
          company: ticket.company || (ticket.type === 'bus' ? 'شرکت اتوبوسرانی' : 'راه آهن'),
          origin: ticket.from || 'تهران',
          destination: ticket.to || 'مشهد',
          departureDate: ticket.date,
          departureTime: ticket.departureTime || '14:30',
          arrivalTime: ticket.arrivalTime || '20:00',
          seatNumbers: ticket.seatNumbers,
        };
      }

      downloadTicketPDF(ticketData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('خطا در ایجاد فایل PDF. لطفاً دوباره تلاش کنید.');
    } finally {
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

  const { icon, bg } = getTicketIcon();

  return (
    <div className="bg-white border border-neutral-gray2 rounded-xl p-4 shadow-sm">
      <div className="flex items-start gap-3 mb-3">
        <div className={`p-2 rounded-lg ${bg}`}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-neutral-gray8">{ticket.title}</h3>
          <p className="text-xs text-neutral-gray6 mt-0.5">{ticket.subtitle}</p>
          <p className="text-[11px] text-neutral-gray5 mt-1">کد پیگیری: {ticket.trackingCode}</p>
        </div>
        <Badge variant={(statusMap[ticket.status] ?? statusMap.confirmed).variant}>
          {(statusMap[ticket.status] ?? statusMap.confirmed).label}
        </Badge>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-neutral-gray2">
        <span className="font-bold text-primary-blue text-sm">
          {(ticket.price ?? 0).toLocaleString('fa-IR')} تومان
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? 'در حال آماده‌سازی...' : 'دانلود بلیط'}
        </Button>
      </div>
    </div>
  );
}
