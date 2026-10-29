import { store } from '@/store';
import { logoutThunk } from '@/store/authSlice';
import { clearStoredAuth } from '@/lib/authStorage';

export async function signOutAdmin() {
  await (store.dispatch as any)(logoutThunk());
  if (typeof window !== 'undefined') {
    // logoutThunk already clears Redux + storage, but make sure both session
    // and persistent admin credentials are gone even if the network call fails.
    clearStoredAuth('admin');
    window.location.href = '/admin/login';
  }
}