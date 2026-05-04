import {
  Bell,
  CalendarCheck,
  Check,
  CheckCircle2,
  FileText,
  MessageCircle,
  ShieldCheck,
  Trophy,
  UsersRound,
  Wallet,
} from 'lucide-react';

const notifications = [
  {
    title: 'New message from Dr. Wanjiku Muthoni',
    body: 'You have received a new message regarding partnership opportunities.',
    time: '2 hours ago',
    type: 'messages',
    unread: true,
    icon: MessageCircle,
    style: 'bg-blue-100 text-blue-600',
  },
  {
    title: 'Invoice received',
    body: 'Invoice #INV-2024-0045 from GreenTech Solutions (\u20a625,000)',
    time: '3 hours ago',
    type: 'invoices',
    unread: true,
    icon: FileText,
    style: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'New service booking',
    body: 'Kwame Agro Cooperative has requested a booking for AgriTech Training.',
    time: '5 hours ago',
    type: 'bookings',
    unread: true,
    icon: CalendarCheck,
    style: 'bg-green-100 text-green-600',
  },
  {
    title: 'Invoice confirmed',
    body: 'Your invoice #INV-2024-0044 has been confirmed by the client.',
    time: '1 day ago',
    type: 'invoices',
    unread: false,
    icon: CheckCircle2,
    style: 'bg-purple-100 text-purple-600',
  },
  {
    title: 'Listing verified',
    body: 'Your EcoBrick Builder listing has been successfully verified!',
    time: '2 days ago',
    type: 'all',
    unread: false,
    icon: ShieldCheck,
    style: 'bg-emerald-100 text-emerald-600',
  },
  {
    title: 'Payment received',
    body: 'Payment of \u20a6120,000 for invoice #INV-2024-0042 has been received.',
    time: '3 days ago',
    type: 'invoices',
    unread: false,
    icon: Wallet,
    style: 'bg-amber-100 text-amber-600',
  },
  {
    title: 'Impact application received',
    body: 'A new impact program application is ready for review.',
    time: '4 days ago',
    type: 'impact',
    unread: false,
    icon: UsersRound,
    style: 'bg-sky-100 text-sky-600',
  },
  {
    title: 'Competition application approved',
    body: 'Your innovation challenge application has moved to the next stage.',
    time: '5 days ago',
    type: 'competition',
    unread: false,
    icon: Trophy,
    style: 'bg-yellow-100 text-yellow-700',
  },
];

export default async function NotificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string | string[] }>;
}) {
  const params = await searchParams;
  const filter = typeof params.filter === 'string' ? params.filter : 'all';
  const visibleNotifications =
    filter === 'all'
      ? notifications
      : notifications.filter((notification) => notification.type === filter);

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-start justify-between border-b border-gray-200 px-6 py-6">
        <div>
          <div className="flex items-center gap-3 lg:hidden">
            <Bell size={22} className="text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>
          <h1 className="hidden text-2xl font-bold text-gray-900 lg:block">Notifications</h1>
          <p className="mt-1 text-sm text-gray-400">3 unread notifications</p>
        </div>
        <button className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
          <Check size={16} strokeWidth={1.8} />
          <span>Mark all as read</span>
        </button>
      </div>

      <div>
        {visibleNotifications.map((notification) => {
          const Icon = notification.icon;

          return (
            <article
              key={`${notification.title}-${notification.time}`}
              className="relative flex gap-4 border-b border-gray-200 px-6 py-5 last:border-b-0"
            >
              <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-full ${notification.style}`}>
                <Icon size={24} strokeWidth={1.9} />
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <h2 className={`text-base ${notification.unread ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                  {notification.title}
                </h2>
                <p className="mt-1 text-sm leading-snug text-gray-400">{notification.body}</p>
                <p className="mt-1 text-sm text-gray-400">{notification.time}</p>
              </div>
              {notification.unread && <span className="absolute right-6 top-6 h-3 w-3 rounded-full bg-red-500" />}
            </article>
          );
        })}
      </div>
    </section>
  );
}
