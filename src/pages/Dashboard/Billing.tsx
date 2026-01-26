import DashboardLayout from '@/components/DashboardLayout';
import { CreditCard, Receipt, CheckCircle, Clock } from 'lucide-react';

export default function Billing() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'advanced' as const
  };

  const invoices = [
    { id: 'INV-2024-001', date: '2024-01-01', amount: '$1,500.00', status: 'Paid' },
    { id: 'INV-2024-002', date: '2024-01-15', amount: '$500.00', status: 'Paid' },
    { id: 'INV-2024-003', date: '2024-02-01', amount: '$1,200.00', status: 'Pending' },
  ];

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-sidebar-primary">Billing & Receipts</h1>
          <p className="text-muted-foreground">Manage your payments and download invoices.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-card border rounded-xl shadow-soft">
            <h3 className="font-bold mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-church-gold" />
              Active Subscripiton
            </h3>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm font-medium">Advanced Family Plan</p>
                <p className="text-2xl font-bold text-church-navy">$2,500 / year</p>
              </div>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-bold">ACTIVE</span>
            </div>
          </div>

          <div className="p-6 bg-card border rounded-xl shadow-soft">
            <h3 className="font-bold mb-4 flex items-center">
              <Receipt className="w-5 h-5 mr-2 text-church-gold" />
              Recent Invoices
            </h3>
            <div className="space-y-3">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex justify-between items-center text-sm p-2 hover:bg-muted/50 rounded-lg transition-colors">
                  <div>
                    <p className="font-medium">{inv.id}</p>
                    <p className="text-[10px] text-muted-foreground">{inv.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{inv.amount}</p>
                    <div className="flex items-center justify-end space-x-1">
                      {inv.status === 'Paid' ? (
                        <CheckCircle className="w-3 h-3 text-green-500" />
                      ) : (
                        <Clock className="w-3 h-3 text-amber-500" />
                      )}
                      <span className={`text-[10px] ${inv.status === 'Paid' ? 'text-green-600' : 'text-amber-600'}`}>{inv.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
