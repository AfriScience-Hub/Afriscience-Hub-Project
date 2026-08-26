import { redirect } from 'next/navigation';
import { ADMIN_ROUTES } from './data/routes';

export default function AdminPage() {
  redirect(ADMIN_ROUTES.dashboard);
}
