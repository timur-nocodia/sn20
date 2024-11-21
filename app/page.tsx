import { Metadata } from 'next';
import { DashboardPage } from '@/components/dashboard/page';

export const metadata: Metadata = {
  title: 'Dashboard | Skillnetwork',
  description: 'Manage your social media content and schedule posts',
};

export default function Page() {
  return <DashboardPage />;
}