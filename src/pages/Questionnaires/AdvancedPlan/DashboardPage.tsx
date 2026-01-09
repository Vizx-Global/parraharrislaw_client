import DashboardLayout from '@/components/DashboardLayout';
import DashboardOverview from '@/components/DashboardOverview';

export default function DashboardPage() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'advanced' as const
  };

  return (
    <DashboardLayout user={user}>
      <DashboardOverview />
    </DashboardLayout>
  );
}