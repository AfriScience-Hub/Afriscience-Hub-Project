import { store } from '@/store';
import { logoutThunk } from '@/store/authSlice';

export async function signOutAdmin() {
  await (store.dispatch as any)(logoutThunk());
  if (typeof window !== 'undefined') {
    localStorage.removeItem('afrisciencehub_admin_token');
    localStorage.removeItem('afrisciencehub_admin');
    window.location.href = '/admin/login';
  }
}