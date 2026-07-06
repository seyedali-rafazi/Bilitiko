import Link from 'next/link';
import { FaEnvelope, FaPhone, FaShieldAlt, FaSignOutAlt, FaSuitcase, FaTicketAlt } from 'react-icons/fa';
import { Card, CardContent } from '@/components/ui/shadcn/card';
import { Button } from '@/components/ui/shadcn/button';
import { Separator } from '@/components/ui/shadcn/separator';
import { getUserDisplayName, getUserInitials } from '@/lib/session';
import type { UserSession } from '@/lib/types';

type ProfileTab = 'account' | 'tickets' | 'trips';

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

export default function ProfileSidebar({
  user,
  ticketCount,
  activeTab,
  onLogout,
}: {
  user: UserSession;
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
