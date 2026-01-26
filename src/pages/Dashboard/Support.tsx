import DashboardLayout from '@/components/DashboardLayout';
import { HelpCircle, Book, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Support() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'advanced' as const
  };

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-sidebar-primary">Support Center</h1>
          <p className="text-muted-foreground">Get help with the platform or your case.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-card border rounded-xl shadow-soft flex flex-col items-center text-center group hover:border-church-gold transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-church-navy/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-church-gold/10 transition-colors">
              <Book className="w-6 h-6 text-church-navy" />
            </div>
            <h3 className="font-bold text-sm mb-1">Knowledge Base</h3>
            <p className="text-[10px] text-muted-foreground">Articles and guides on how to use the portal.</p>
          </div>

          <div className="p-6 bg-card border rounded-xl shadow-soft flex flex-col items-center text-center group hover:border-church-gold transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-church-navy/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-church-gold/10 transition-colors">
              <MessageCircle className="w-6 h-6 text-church-navy" />
            </div>
            <h3 className="font-bold text-sm mb-1">Live Chat</h3>
            <p className="text-[10px] text-muted-foreground">Talk to our support team right now.</p>
          </div>

          <div className="p-6 bg-card border rounded-xl shadow-soft flex flex-col items-center text-center group hover:border-church-gold transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-church-navy/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-church-gold/10 transition-colors">
              <Phone className="w-6 h-6 text-church-navy" />
            </div>
            <h3 className="font-bold text-sm mb-1">Call Us</h3>
            <p className="text-[10px] text-muted-foreground">Priority phone support for Advanced users.</p>
          </div>

          <div className="p-6 bg-card border rounded-xl shadow-soft flex flex-col items-center text-center group hover:border-church-gold transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-church-navy/5 rounded-full flex items-center justify-center mb-4 group-hover:bg-church-gold/10 transition-colors">
              <HelpCircle className="w-6 h-6 text-church-navy" />
            </div>
            <h3 className="font-bold text-sm mb-1">Submit Ticket</h3>
            <p className="text-[10px] text-muted-foreground">Open a support request for complex issues.</p>
          </div>
        </div>

        <div className="bg-church-navy text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Need direct legal advice?</h2>
            <p className="text-white/70 max-w-md">For specific legal questions about your case, please use the Attorney Messages section or book a consultation.</p>
          </div>
          <Button className="bg-white text-church-navy hover:bg-white/90 font-bold px-8">
            Go to Inbox
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
