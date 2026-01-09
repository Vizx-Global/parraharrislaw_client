import { MessageSquare, FileText, UserCheck, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'message',
    title: 'Attorney Message Received',
    description: 'Sarah Johnson provided feedback on custody arrangements',
    time: '2 hours ago',
    icon: MessageSquare,
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    id: 2,
    type: 'document',
    title: 'Document Updated',
    description: 'Parenting plan draft revised with attorney comments',
    time: '5 hours ago',
    icon: FileText,
    color: 'text-green-600',
    bg: 'bg-green-50'
  },
  {
    id: 3,
    type: 'review',
    title: 'Financial Review Completed',
    description: 'Income verification documents approved',
    time: '1 day ago',
    icon: CheckCircle,
    color: 'text-church-gold',
    bg: 'bg-orange-50'
  },
  {
    id: 4,
    type: 'reminder',
    title: 'Document Upload Reminder',
    description: 'Bank statements and employment verification needed',
    time: '2 days ago',
    icon: AlertCircle,
    color: 'text-red-600',
    bg: 'bg-red-50'
  },
  {
    id: 5,
    type: 'system',
    title: 'Plan Progress Updated',
    description: 'Questionnaire completion triggered attorney assignment',
    time: '3 days ago',
    icon: UserCheck,
    color: 'text-purple-600',
    bg: 'bg-purple-50'
  }
];

export default function RecentActivityTimeline() {
  return (
    <div className="church-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
          <p className="text-muted-foreground">Latest updates on your case</p>
        </div>
        <button className="text-sm text-church-navy hover:text-church-gold transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          
          return (
            <div key={activity.id} className="flex items-start space-x-4 group">
              {/* Timeline dot and connector */}
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.bg} group-hover:scale-110 transition-transform`}>
                  <Icon className={activity.color} size={18} />
                </div>
                {index < activities.length - 1 && (
                  <div className="w-0.5 h-8 bg-border mt-2"></div>
                )}
              </div>
              
              {/* Activity content */}
              <div className="flex-1 pb-4 group-last:pb-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-semibold text-foreground text-sm">{activity.title}</h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{activity.time}</span>
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                
                {/* Action buttons for relevant activities */}
                {(activity.type === 'message' || activity.type === 'document') && (
                  <div className="mt-2 flex space-x-2">
                    {activity.type === 'message' && (
                      <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                        Reply
                      </button>
                    )}
                    {activity.type === 'document' && (
                      <button className="text-xs text-green-600 hover:text-green-700 font-medium">
                        Review Changes
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-church-navy">12</div>
            <div className="text-xs text-muted-foreground">Messages</div>
          </div>
          <div>
            <div className="text-lg font-bold text-church-navy">8</div>
            <div className="text-xs text-muted-foreground">Documents</div>
          </div>
          <div>
            <div className="text-lg font-bold text-church-navy">3</div>
            <div className="text-xs text-muted-foreground">Updates</div>
          </div>
        </div>
      </div>
    </div>
  );
}