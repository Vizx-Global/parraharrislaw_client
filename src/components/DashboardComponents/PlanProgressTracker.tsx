import { CheckCircle, Clock, AlertCircle, FileText, Users, MessageSquare } from 'lucide-react';

const milestones = [
  {
    id: 1,
    name: 'Initial Questionnaire',
    status: 'completed',
    description: 'Comprehensive parenting plan details submitted and reviewed',
    icon: CheckCircle,
    date: 'Completed Jan 15, 2024',
    details: '7 sections completed • 45 questions answered'
  },
  {
    id: 2,
    name: 'Financial Documentation',
    status: 'current',
    description: 'Upload required financial documents for child support calculation',
    icon: Clock,
    date: 'In Progress - Due Jan 22, 2024',
    details: '3 of 5 documents uploaded • Income verification pending'
  },
  {
    id: 3,
    name: 'Attorney Legal Review',
    status: 'pending',
    description: 'Comprehensive legal analysis and plan refinement by your attorney',
    icon: FileText,
    date: 'Starts after financial docs',
    details: 'Sarah Johnson, Esq. • Family Law Specialist'
  },
  {
    id: 4,
    name: 'Attorney Consultation',
    status: 'pending',
    description: 'One-on-one strategy session to discuss plan specifics',
    icon: MessageSquare,
    date: 'Schedule when ready',
    details: '60-minute session included • Virtual or in-person'
  },
  {
    id: 5,
    name: 'Co-Parent Review',
    status: 'pending',
    description: 'Share finalized plan with co-parent for review and discussion',
    icon: Users,
    date: 'After attorney approval',
    details: 'Secure sharing • 7-day review period'
  },
  {
    id: 6,
    name: 'Final Execution',
    status: 'pending',
    description: 'Digital signing and notarization of final parenting plan',
    icon: AlertCircle,
    date: 'Pending previous steps',
    details: 'E-signature • Legal notarization • Court filing ready'
  }
];

const statusConfig = {
  completed: { 
    color: 'text-green-600', 
    bg: 'bg-green-50', 
    border: 'border-green-200',
    badge: 'Completed'
  },
  current: { 
    color: 'text-church-gold', 
    bg: 'bg-orange-50', 
    border: 'border-orange-200',
    badge: 'Current Step'
  },
  pending: { 
    color: 'text-gray-400', 
    bg: 'bg-gray-50', 
    border: 'border-gray-200',
    badge: 'Upcoming'
  }
};

export default function PlanProgressTracker() {
  const completedCount = milestones.filter(m => m.status === 'completed').length;
  const totalCount = milestones.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="church-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Your Plan Progress</h2>
          <p className="text-muted-foreground">Track your journey to a finalized parenting plan</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-church-navy">{progressPercentage}%</div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Milestone Progress</span>
          <span>{completedCount} of {totalCount} completed</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-church-gold to-church-navy h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-6">
        {milestones.map((milestone, index) => {
          const config = statusConfig[milestone.status as keyof typeof statusConfig];
          const Icon = milestone.icon;
          
          return (
            <div key={milestone.id} className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:border-church-gold/30 transition-colors">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center border-2 ${config.border} ${config.bg} flex-shrink-0`}>
                <Icon className={config.color} size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{milestone.name}</h3>
                    <p className="text-muted-foreground mt-1">{milestone.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.color} flex-shrink-0 ml-4`}>
                    {config.badge}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{milestone.date}</span>
                  <span className="text-church-navy font-medium">{milestone.details}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}