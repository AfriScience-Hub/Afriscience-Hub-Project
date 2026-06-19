'use client';

import { useState } from 'react';
import { MOCK_NOTIFICATIONS } from '../data';
import NotificationList from './components/NotificationList';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const handleMarkNotificationRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <NotificationList
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkRead={handleMarkNotificationRead}
        onMarkAllRead={handleMarkAllRead}
      />
    </div>
  );
}
