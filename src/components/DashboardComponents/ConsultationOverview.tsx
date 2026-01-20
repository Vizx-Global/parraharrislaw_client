import { Calendar, Clock, Video, Users } from 'lucide-react';

export default function ConsultationOverview() {
  const upcomingSession = {
    date: 'January 25, 2024',
    time: '2:00 PM - 3:00 PM EST',
    type: 'Video Conference',
    attorney: 'Sarah Johnson, Esq.',
    duration: '60 minutes',
    preparation: ['Review draft plan', 'Prepare questions', 'Financial documents ready']
  };

  return (
    <div className="church-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Consultation Session</h2>
          <p className="text-muted-foreground">Your included attorney strategy session</p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Scheduled
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
          <Calendar className="w-5 h-5 text-blue-600" />
          <div>
            <div className="font-semibold text-foreground">{upcomingSession.date}</div>
            <div className="text-sm text-muted-foreground">{upcomingSession.time}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Video className="w-5 h-5 text-church-navy" />
          <div>
            <div className="font-semibold text-foreground">{upcomingSession.type}</div>
            <div className="text-sm text-muted-foreground">Zoom link will be provided</div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Clock className="w-5 h-5 text-church-navy" />
          <div>
            <div className="font-semibold text-foreground">{upcomingSession.duration}</div>
            <div className="text-sm text-muted-foreground">Strategy session</div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-foreground mb-3 flex items-center">
          <Users className="w-4 h-4 mr-2" />
          Preparation Checklist
        </h4>
        <div className="space-y-2">
          {upcomingSession.preparation.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-4 h-4 border-2 border-church-gold rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-church-gold rounded"></div>
              </div>
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="church-button-outline py-2 text-sm">
          Reschedule
        </button>
        <button className="church-button py-2 text-sm">
          Add to Calendar
        </button>
      </div>
    </div>
  );
}