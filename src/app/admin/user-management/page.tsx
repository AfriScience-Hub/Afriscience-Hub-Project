'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronLeft, ChevronRight, LayoutDashboard, Ban, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import TableActionMenu from '@/app/admin/components/TableActionMenu';
import {
  fetchAllUsers,
  fetchSuspendedUsers,
  suspendUser,
  userDisplayName,
  userCountry,
  displayUserId,
  formatISODate,
  DEFAULT_PAGE_SIZE,
  type AdminUser,
  type UsersPagination,
} from './userApi';

type StatusFilter = 'All Status' | 'Verified' | 'Unverified';

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join('') || '?';
}

export default function AllUsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [pagination, setPagination] = useState<UsersPagination | null>(null);
  const [totalSuspended, setTotalSuspended] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All Status');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [pendingSuspend, setPendingSuspend] = useState<AdminUser | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [list, suspended] = await Promise.all([
        fetchAllUsers({ page: currentPage, limit: pageSize }),
        fetchSuspendedUsers({ page: 1, limit: 1 }).catch(() => null),
      ]);
      setUsers(list.data);
      setPagination(list.pagination);
      setTotalSuspended(suspended?.pagination?.totalItems ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load users');
      setUsers([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      const matchesSearch = !q ||
        userDisplayName(u).toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.phone || '').toLowerCase().includes(q) ||
        (u.profile?.username || '').toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q);
      const matchesStatus =
        statusFilter === 'All Status' ||
        (statusFilter === 'Verified' ? u.isVerified : !u.isVerified);
      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  const handleSuspend = async () => {
    if (!pendingSuspend) return;
    const user = pendingSuspend;
    setBusyId(user.id);
    try {
      const message = await suspendUser(user.id);
      toast.success(message || 'User suspended');
      setPendingSuspend(null);
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Failed to suspend user');
    } finally {
      setBusyId(null);
    }
  };

  const totalItems = pagination?.totalItems ?? users.length;
  const totalPages = pagination?.totalPages ?? 1;
  const from = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  const stats = [
    { label: 'Total Users', value: totalItems.toLocaleString(), change: 'All registered accounts', positive: true },
    { label: 'Verified Users', value: users.filter((u) => u.isVerified).length.toLocaleString(), change: 'On this page', positive: true },
    { label: 'Unverified Users', value: users.filter((u) => !u.isVerified).length.toLocaleString(), change: 'On this page', positive: false },
    { label: 'Suspended Users', value: totalSuspended === null ? '\u2014' : totalSuspended.toLocaleString(), change: 'Currently suspended', positive: false },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-gray-medium mb-0.5">
            <span>Dashboard</span><span>/</span><span>User Management</span><span>/</span>
            <span className="text-neutral-black font-medium">All Users</span>
          </div>
          <h1 className="text-xl font-bold text-neutral-black">User Management</h1>
        </div>
        <button
          onClick={load}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-gray-light rounded-lg text-xs font-medium text-neutral-gray-dark hover:bg-neutral-bg-light disabled:opacity-50 cursor-pointer"
        >
          <RefreshCw className={cn('h-3.5 w-3.5', loading && 'animate-spin')} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-neutral-gray-light bg-white p-3 shadow-sm">
            <p className="text-[10px] text-neutral-gray-medium">{stat.label}</p>
            <p className="text-lg font-bold text-neutral-black mt-0.5">{stat.value}</p>
            <p className={cn('text-[10px] mt-0.5', stat.positive ? 'text-green-600' : 'text-red-500')}>{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neutral-gray-medium" />
          <input
            type="text"
            placeholder="Search by name, email, phone or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-neutral-gray-light focus:border-[#453DD8] focus:ring-1 focus:ring-[#453DD8] outline-none"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-neutral-gray-light rounded-lg text-xs text-neutral-gray-dark hover:bg-neutral-bg-light cursor-pointer whitespace-nowrap"
          >
            {statusFilter} <ChevronDown className="h-3 w-3" />
          </button>
          {showStatusDropdown && (
            <div className="absolute z-50 top-full mt-1 left-0 w-40 bg-white border border-neutral-gray-light rounded-lg shadow-lg py-1">
              {(['All Status', 'Verified', 'Unverified'] as StatusFilter[]).map((s) => (
                <button
                  key={s}
                  onClick={() => { setStatusFilter(s); setShowStatusDropdown(false); }}
                  className={cn('w-full text-left px-3 py-1.5 text-xs hover:bg-neutral-bg-light cursor-pointer', statusFilter === s && 'bg-[#453DD8]/5 text-[#453DD8] font-medium')}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
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
                <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">Joined</th>
                <th className="text-left px-3 py-2 font-medium text-neutral-gray-dark">Status</th>
                <th className="text-right px-3 py-2 font-medium text-neutral-gray-dark">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <Loader2 className="h-5 w-5 animate-spin text-[#453DD8] mx-auto mb-2" />
                    <p className="text-xs text-neutral-gray-medium">Loading users...</p>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-red-600">{error}</p>
                    <button onClick={load} className="mt-2 text-xs text-[#453DD8] font-medium hover:underline cursor-pointer">Try again</button>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-neutral-black">No users found</p>
                    <p className="text-xs text-neutral-gray-medium mt-1">Try adjusting your search or filters.</p>
                  </td>
                </tr>
              ) : filtered.map((user) => {
                const name = userDisplayName(user);
                return (
                  <tr key={user.id} className="border-b border-neutral-gray-light last:border-0 hover:bg-neutral-bg-light/50">
                    <td className="px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#453DD8]/10 text-[10px] font-semibold text-[#453DD8]">
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
                    <td className="px-3 py-2.5 text-[10px] text-neutral-gray-dark whitespace-nowrap">{formatISODate(user.createdAt)}</td>
                    <td className="px-3 py-2.5">
                      {user.deletedAt ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-red-600">
                          <span className="h-1 w-1 rounded-full bg-red-500" /> Suspended
                        </span>
                      ) : user.isVerified ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-green-600">
                          <span className="h-1 w-1 rounded-full bg-green-500" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-orange-500">
                          <span className="h-1 w-1 rounded-full bg-orange-400" /> Unverified
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-2.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end">
                        {busyId === user.id ? (
                          <Loader2 className="h-4 w-4 animate-spin text-neutral-gray-medium" />
                        ) : (
                          <TableActionMenu
                            items={[
                              { label: 'View Dashboard', icon: <LayoutDashboard className="h-3.5 w-3.5 text-neutral-gray-dark" />, onClick: () => router.push(`/admin/user-management/dashboard?userId=${user.id}`) },
                              ...(user.deletedAt
                                ? []
                                : [{ label: 'Suspend User', icon: <Ban className="h-3.5 w-3.5 text-red-500" />, onClick: () => setPendingSuspend(user), danger: true }]),
                            ]}
                          />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 px-3 py-2 border-t border-neutral-gray-light sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-neutral-gray-dark text-center sm:text-left">Showing {from} – {to} of {totalItems} users</p>
          <div className="flex flex-wrap items-center justify-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={!pagination?.hasPrevious || loading}
              className="p-1 rounded hover:bg-neutral-bg-light disabled:opacity-40 cursor-pointer flex-shrink-0"
            >
              <ChevronLeft className="h-3.5 w-3.5 text-neutral-gray-medium" />
            </button>
            {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
              .map((page, idx, arr) => (
                <span key={page} className="flex items-center">
                  {idx > 0 && page - arr[idx - 1] > 1 && <span className="text-neutral-gray-medium px-0.5">…</span>}
                  <button
                    onClick={() => setCurrentPage(page)}
                    disabled={loading}
                    className={cn(
                      'w-6 h-6 rounded text-[11px] font-medium cursor-pointer disabled:opacity-50',
                      currentPage === page ? 'bg-[#453DD8] text-white' : 'hover:bg-neutral-bg-light text-neutral-gray-dark'
                    )}
                  >
                    {page}
                  </button>
                </span>
              ))}
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={!pagination?.hasNext || loading}
              className="p-1 rounded hover:bg-neutral-bg-light disabled:opacity-40 cursor-pointer flex-shrink-0"
            >
              <ChevronRight className="h-3.5 w-3.5 text-neutral-gray-medium" />
            </button>
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              className="ml-1 border border-neutral-gray-light rounded text-[10px] px-1.5 py-1 text-neutral-gray-dark outline-none cursor-pointer flex-shrink-0"
            >
              <option value={10}>10 / page</option>
              <option value={25}>25 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>
        </div>
      </div>

      {pendingSuspend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setPendingSuspend(null)}>
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-sm font-bold text-neutral-black mb-1">Suspend this user?</h3>
            <p className="text-xs text-neutral-gray-medium mb-4">
              {userDisplayName(pendingSuspend)} ({pendingSuspend.email}) will lose access to the platform until restored.
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setPendingSuspend(null)} className="px-3 py-1.5 text-xs font-medium text-neutral-gray-dark border border-neutral-gray-light rounded-lg hover:bg-neutral-bg-light cursor-pointer">
                Cancel
              </button>
              <button
                onClick={handleSuspend}
                disabled={busyId === pendingSuspend.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 cursor-pointer"
              >
                {busyId === pendingSuspend.id && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                Suspend User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}