import DashboardLayout from '@/components/DashboardLayout';
import { DollarSign, PieChart, TrendingUp, ShieldCheck } from 'lucide-react';

export default function FinancialInfo() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'advanced' as const
  };

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-sidebar-primary">Financial Information</h1>
          <p className="text-muted-foreground">Detailed overview of your assets, liabilities, and disclosures.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-card border rounded-xl shadow-soft">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-50 rounded-lg text-green-600">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-bold">Total Assets</h3>
            </div>
            <p className="text-3xl font-bold text-sidebar-primary">$245,000</p>
            <p className="text-[10px] text-muted-foreground mt-2">Verified via bank disclosures</p>
          </div>

          <div className="p-6 bg-card border rounded-xl shadow-soft">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-red-50 rounded-lg text-red-600">
                <PieChart className="w-5 h-5" />
              </div>
              <h3 className="font-bold">Total Liabilities</h3>
            </div>
            <p className="text-3xl font-bold text-sidebar-primary">$112,000</p>
            <p className="text-[10px] text-muted-foreground mt-2">Including mortgages and loans</p>
          </div>

          <div className="p-6 bg-card border rounded-xl shadow-soft">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-church-navy/5 rounded-lg text-church-navy">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold">Disclosure Status</h3>
            </div>
            <p className="text-3xl font-bold text-sidebar-primary">85%</p>
            <div className="w-full bg-muted h-2 rounded-full mt-4">
              <div className="bg-church-gold h-full rounded-full w-[85%]" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
