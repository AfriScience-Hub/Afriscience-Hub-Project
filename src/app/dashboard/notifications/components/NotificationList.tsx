'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../../../components/ui/Button';
import type { Notification } from '../../data';

interface NotificationListProps {
  notifications: Notification[];
  unreadCount: number;
  onMarkRead: (id: number) => void;
  onMarkAllRead: () => void;
}

export default function NotificationList({ notifications, unreadCount, onMarkRead, onMarkAllRead }: NotificationListProps) {
  return (
    <div className="rounded-xl border border-neutral-gray-light bg-white shadow-sm">
      <div className="flex items-center justify-between p-5 border-b border-neutral-gray-light">
        <div>
          <h2 className="text-xl font-bold text-neutral-black">Notifications</h2>
          <p className="text-sm text-neutral-gray-medium mt-0.5">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        {unreadCount > 0 && (
          <Button size="sm" variant="outline" onClick={onMarkAllRead}>
            <Check className="h-3.5 w-3.5 mr-1" /> Mark all as read
          </Button>
        )}
      </div>
      <div className="divide-y divide-neutral-gray-light">
        {notifications.map(notif => (
          <div
            key={notif.id}
            className={cn("flex items-start gap-4 px-5 py-4 hover:bg-neutral-bg-light cursor-pointer transition-colors",
              !notif.read && "bg-blue-50/30"
            )}
            onClick={() => onMarkRead(notif.id)}
          >
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0",
              notif.type === 'message' ? "bg-blue-100" :
              notif.type === 'invoice' ? "bg-purple-100" :
              notif.type === 'booking' ? "bg-green-100" :
              notif.type === 'verification' ? "bg-emerald-100" :
              notif.type === 'payment' ? "bg-amber-100" :
              "bg-neutral-bg-light"
            )}>
              <notif.icon className={cn(
                "h-5 w-5",
                notif.type === 'message' ? "text-blue-600" :
                notif.type === 'invoice' ? "text-purple-600" :
                notif.type === 'booking' ? "text-green-600" :
                notif.type === 'verification' ? "text-emerald-600" :
                notif.type === 'payment' ? "text-amber-600" :
                "text-neutral-gray-medium"
              )} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn("text-sm", notif.read ? "text-neutral-gray-dark" : "font-bold text-neutral-black")}>{notif.title}</p>
              <p className="text-sm text-neutral-gray-medium mt-0.5">{notif.message}</p>
              <p className="text-xs text-neutral-gray-medium mt-1">{notif.time}</p>
            </div>
            {!notif.read && <div className="h-2.5 w-2.5 rounded-full bg-brand-red-600 flex-shrink-0 mt-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}
