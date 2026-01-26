import DashboardLayout from '@/components/DashboardLayout';
import { Calendar, Video, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Consultation() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'advanced' as const
  };

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-sidebar-primary">Consultations</h1>
          <p className="text-muted-foreground">Scheule and manage your meetings with your attorneys.</p>
        </div>

        <div className="bg-card border rounded-2xl p-8 shadow-elegant flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-church-navy/5 rounded-full flex items-center justify-center mb-6">
            <Calendar className="w-8 h-8 text-church-gold" />
          </div>
          <h2 className="text-xl font-bold mb-2">Ready to speak with an expert?</h2>
          <p className="text-muted-foreground mb-8 max-w-md">Your Advanced Plan includes unlimited priority consultations. Book your next session below.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
            <div className="p-4 border rounded-xl hover:border-church-gold transition-colors cursor-pointer text-left">
              <div className="flex items-center space-x-3 mb-2">
                <Video className="w-4 h-4 text-church-navy" />
                <span className="font-bold">Video Meeting</span>
              </div>
              <p className="text-xs text-muted-foreground">Zoom or Google Meet link provided.</p>
            </div>
            <div className="p-4 border rounded-xl hover:border-church-gold transition-colors cursor-pointer text-left">
              <div className="flex items-center space-x-3 mb-2">
                <MapPin className="w-4 h-4 text-church-navy" />
                <span className="font-bold">In-Person</span>
              </div>
              <p className="text-xs text-muted-foreground">Visit our office at Downtown Plaza.</p>
            </div>
          </div>

          <Button className="mt-8 bg-church-navy hover:bg-church-navy/90 text-white min-w-[200px]">
            Schedule Now
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
