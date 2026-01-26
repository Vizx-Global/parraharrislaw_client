import DashboardLayout from '@/components/DashboardLayout';
import { MessageSquare, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AttorneyMessages() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'advanced' as const
  };

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-sidebar-primary">Attorney Messages</h1>
          <p className="text-muted-foreground">Secure communication with your legal team.</p>
        </div>

        <div className="bg-card border rounded-xl overflow-hidden shadow-soft">
          <div className="p-4 border-b bg-muted/30 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-church-gold" />
              <span className="font-semibold">Chat with Lead Attorney</span>
            </div>
            <span className="text-xs text-muted-foreground">Encryption: End-to-End</span>
          </div>
          
          <div className="h-[400px] p-6 overflow-y-auto space-y-4 bg-muted/5">
            <div className="flex justify-start">
              <div className="bg-white border rounded-lg p-3 max-w-[80%] shadow-sm">
                <p className="text-sm">Hello John, I've reviewed your latest questionnaire updates. We'll need to schedule a short call to finalize the financial disclosures section.</p>
                <span className="text-[10px] text-muted-foreground mt-1 block">10:30 AM</span>
              </div>
            </div>
            
            <div className="flex justify-end">
              <div className="bg-church-navy text-white rounded-lg p-3 max-w-[80%] shadow-sm">
                <p className="text-sm">That sounds good. I'm available tomorrow afternoon between 2 PM and 4 PM. Does that work for you?</p>
                <span className="text-[10px] text-white/70 mt-1 block">10:45 AM</span>
              </div>
            </div>
          </div>

          <div className="p-4 border-t flex space-x-2">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-1 bg-muted/50 border-none rounded-lg px-4 text-sm focus:ring-1 focus:ring-church-gold outline-none"
            />
            <Button size="sm" className="bg-church-gold hover:bg-church-gold/90">
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
