import { Upload, MessageSquare, Calendar, FileText, Download, Settings } from 'lucide-react';

const quickActions = [
  {
    icon: Upload,
    title: 'Upload Financial Documents',
    description: 'Submit required financial documents for child support calculation',
    status: '3 of 5 documents pending',
    buttonText: 'Upload Now',
    variant: 'primary' as const,
    progress: 40
  },
  {
    icon: MessageSquare,
    title: 'Message Your Attorney',
    description: 'Secure communication with Sarah Johnson about your case',
    status: '2 unread messages',
    buttonText: 'Open Messages',
    variant: 'outline' as const,
    progress: 100
  },
  {
    icon: Calendar,
    title: 'Schedule Consultation',
    description: 'Book your 60-minute strategy session with your attorney',
    status: '1 session included',
    buttonText: 'View Availability',
    variant: 'outline' as const,
    progress: 0
  },
  {
    icon: FileText,
    title: 'Review Draft Plan',
    description: 'Preview current version of your parenting plan',
    status: 'Last updated today',
    buttonText: 'View Draft',
    variant: 'outline' as const,
    progress: 75
  },
  {
    icon: Download,
    title: 'Download Resources',
    description: 'Access templates, guides, and legal resources',
    status: '12 resources available',
    buttonText: 'Browse Library',
    variant: 'outline' as const,
    progress: 100
  },
  {
    icon: Settings,
    title: 'Plan Settings',
    description: 'Manage notifications and account preferences',
    status: 'All settings active',
    buttonText: 'Configure',
    variant: 'outline' as const,
    progress: 100
  }
];

export default function ActionCardsGrid() {
  return (
    <div className="church-card">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground">Quick Actions</h2>
        <p className="text-muted-foreground">Next steps to move your plan forward</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          const isPrimary = action.variant === 'primary';
          
          return (
            <div 
              key={index}
              className={`border-2 rounded-xl p-5 transition-all duration-300 hover:shadow-golden ${
                isPrimary 
                  ? 'border-church-gold bg-orange-50' 
                  : 'border-border bg-white hover:border-church-gold/30'
              }`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  isPrimary ? 'bg-church-gold' : 'bg-church-light-blue'
                }`}>
                  <Icon className={isPrimary ? 'text-white' : 'text-church-navy'} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm">{action.title}</h3>
                  <p className="text-muted-foreground text-xs mt-1">{action.status}</p>
                </div>
              </div>
              
              <p className="text-sm text-foreground mb-4">{action.description}</p>
              
              {/* Progress Bar */}
              {action.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress</span>
                    <span>{action.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-church-gold h-2 rounded-full transition-all duration-500"
                      style={{ width: `${action.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              <button className={`w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 ${
                isPrimary
                  ? 'church-button'
                  : 'church-button-outline'
              }`}>
                {action.buttonText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}