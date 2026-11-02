import { redirect } from 'next/navigation';

/** Legacy camelCase URL from older links/bookmarks. */
export default function LegacySuspendedUsersPage() {
  redirect('/admin/user-management/suspended-users');
}
