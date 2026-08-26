'use client';

import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-bg-light flex">
      <AdminSidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
