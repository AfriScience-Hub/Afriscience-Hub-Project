'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, ChevronLeft, ChevronRight, RotateCcw, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import {
  fetchSuspendedUsers,
  restoreUser,
  userDisplayName,
  userCountry,
  displayUserId,
  formatISODate,
  DEFAULT_PAGE_SIZE,
  type AdminUser,
  type UsersPagination,
} from '../userApi';

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || '?';
}

export default function SuspendedUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState<UsersPagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pendingRestore, setPendingRestore] = useState<AdminUser | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const list = await fetchSuspendedUsers({ page: currentPage, limit: pageSize });
      setUsers(list.data);
      setPagination(list.pagination);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load suspended users');
      setUsers([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      userDisplayName(u).toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.phone || '').toLowerCase().includes(q) ||
      (u.profile?.username || '').toLowerCase().includes(q) ||
      u.id.toLowerCase().includes(q)
    );
  }, [users, search]);

  const handleRestore = async () => {
    if (!pendingRestore) return;
    const user = pendingRestore;
    setBusyId(user.id);
    try {
      const message = await restoreUser(user.id);
      toast.success(message || 'User restored');
      setPendingRestore(null);
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to restore user');
    } finally {
      setBusyId(null);
    }
  };

  const totalItems = pagination?.totalItems ?? users.length;
  const from = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
            <span>Dashboard</span><span>/</span><span>User Management</span><span>/</span>
            <span className="text-neutral-black font-medium">Suspended Users</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black">Suspended Users</h1>
          <p className="text-xs text-neutral-gray-dark mt-0.5">Manage users who have been suspended from the platform.</p>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={cn('h-3.5 w-3.5', loading && 'animate-spin')} /> Refresh
        </button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-gray-medium" />
          <input
            type="text"
            placeholder="Search by name, email or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-gray-light focus:border-[#453DD8] focus:ring-1 focus:ring-[#453DD8] outline-none"
          />
        </div>
      </div>

      <div className="rounded-lg border border-neutral-gray-light bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-neutral-gray-light bg-neutral-bg-light">
                <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">User</th>
                <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">Email</th>
                <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">Country</th>
                <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">Suspended On</th>
                <th className="text-right px-3 py-2 font-medium text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="h-5 w-5 animate-spin text-[#453DD8] mx-auto mb-2" />
                    <p className="text-xs text-neutral-gray-medium">Loading suspended users...</p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-red-600">{error}</p>
                    <button onClick={load} className="mt-2 text-xs text-[#453DD8] font-medium hover:underline cursor-pointer">Try again</button>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-neutral-black">No suspended users found</p>
                    <p className="text-xs text-neutral-gray-medium mt-1">No users match your search criteria.</p>
                  </td>
                </tr>
              ) : filtered.map((user) => {
                const name = userDisplayName(user);
                return (
                  <tr key={user.id} className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light/50">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-red-50 text-[10px] font-semibold text-red-600">
                          {initials(name)}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-neutral-black truncate">{name}</span>
                            <span className="text-[9px] text-neutral-gray-medium bg-gray-100 px-1 py-0.5 rounded">{displayUserId(user)}</span>
                          </div>
                          {user.profile?.username && (
                            <span className="text-[9px] text-neutral-gray-medium">@{user.profile.username}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-[10px] text-neutral-gray-dark">{user.email}</td>
                    <td className="px-3 py-2.5 text-[10px] text-neutral-gray-dark whitespace-nowrap">{userCountry(user)}</td>
                    <td className="px-3 py-2.5 text-[10px] text-neutral-gray-dark whitespace-nowrap">{formatISODate(user.deletedAt)}</td>
                    <td className="px-3 py-2.5 text-right">
                      {busyId === user.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-neutral-gray-medium inline" />
                      ) : (
                        <button
                          onClick={() => setPendingRestore(user)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-medium text-green-700 bg-green-50 hover:bg-green-100 rounded-lg cursor-pointer transition-colors"
                        >
                          <RotateCcw className="h-3 w-3" />
                          Reinstate
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-3 py-2 border-t border-neutral-gray-light">
          <p className="text-[11px] text-neutral-gray-dark">Showing {from} – {to} of {totalItems} suspended users</p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={!pagination?.hasPrevious || loading}
              className="p-1 rounded hover:bg-neutral-bg-light disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="h-3.5 w-3.5 text-neutral-gray-medium" />
            </button>
            <span className="text-[11px] text-neutral-gray-dark px-1.5">
              Page {pagination?.page ?? currentPage} of {pagination?.totalPages ?? 1}
            </span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={!pagination?.hasNext || loading}
              className="p-1 rounded hover:bg-neutral-bg-light disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="h-3.5 w-3.5 text-neutral-gray-medium" />
            </button>
          </div>
        </div>
      </div>

      {pendingRestore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setPendingRestore(null)}>
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sm font-bold text-neutral-black mb-1">Restore this user?</h3>
            <p className="text-xs text-neutral-gray-medium mb-4">
              {userDisplayName(pendingRestore)} ({pendingRestore.email}) will regain access to the platform.
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setPendingRestore(null)} className="px-3 py-1.5 text-xs font-medium text-neutral-gray-dark border border-neutral-gray-light rounded-lg hover:bg-neutral-bg-light cursor-pointer">
                Cancel
              </button>
              <button
                onClick={handleRestore}
                disabled={busyId === pendingRestore.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 cursor-pointer"
              >
                {busyId === pendingRestore.id && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Restore User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}