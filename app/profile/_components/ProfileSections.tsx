import Link from 'next/link';
import { FaBus, FaPlane, FaSync, FaSuitcase, FaTrain, FaTicketAlt } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { Button } from '@/components/ui/shadcn/button';
import Badge from '@/components/ui/Badge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { TicketCard, TicketRow, statusMap } from './TicketCard';
import type { UserSession, UserTicket } from '@/lib/types';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted rounded-lg p-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-semibold text-neutral-gray8">{value || '—'}</p>
    </div>
  );
}

export function AccountSection({
  user,
  tickets,
  ticketsLoading,
}: {
  user: UserSession;
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

export function TicketsSection({
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

export function TripsSection({
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
