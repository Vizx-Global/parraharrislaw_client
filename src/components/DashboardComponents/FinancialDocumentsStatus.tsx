import { CheckCircle, Clock, AlertTriangle, FileText, Upload } from 'lucide-react';

const documents = [
  {
    id: 1,
    name: 'Income Verification',
    type: 'Pay Stubs (Last 3 months)',
    status: 'completed',
    uploaded: '3 files',
    date: 'Jan 15, 2024',
    required: true
  },
  {
    id: 2,
    name: 'Tax Returns',
    type: '2022 & 2023 Returns',
    status: 'completed',
    uploaded: '2 files',
    date: 'Jan 15, 2024',
    required: true
  },
  {
    id: 3,
    name: 'Bank Statements',
    type: 'Last 6 months',
    status: 'in-progress',
    uploaded: '4 of 6 files',
    date: 'Due Jan 22, 2024',
    required: true
  },
  {
    id: 4,
    name: 'Employment Verification',
    type: 'Current employment letter',
    status: 'pending',
    uploaded: 'Not uploaded',
    date: 'Due Jan 22, 2024',
    required: true
  },
  {
    id: 5,
    name: 'Additional Assets',
    type: 'Investment accounts, real estate',
    status: 'pending',
    uploaded: 'Not uploaded',
    date: 'Optional',
    required: false
  }
];

const statusConfig = {
  completed: { 
    icon: CheckCircle, 
    color: 'text-green-600', 
    bg: 'bg-green-50',
    label: 'Completed'
  },
  'in-progress': { 
    icon: Clock, 
    color: 'text-church-gold', 
    bg: 'bg-orange-50',
    label: 'In Progress'
  },
  pending: { 
    icon: AlertTriangle, 
    color: 'text-red-600', 
    bg: 'bg-red-50',
    label: 'Pending'
  }
};

export default function FinancialDocumentsStatus() {
  const completedCount = documents.filter(d => d.status === 'completed').length;
  const totalRequired = documents.filter(d => d.required).length;
  const progressPercentage = Math.round((completedCount / totalRequired) * 100);

  return (
    <div className="church-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Financial Documents</h2>
          <p className="text-muted-foreground">Required for child support calculation</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-church-navy">{progressPercentage}%</div>
          <div className="text-sm text-muted-foreground">Complete</div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-900">Document Progress</span>
          <span className="text-sm text-blue-700">{completedCount} of {totalRequired} required</span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => {
          const config = statusConfig[doc.status as keyof typeof statusConfig];
          const Icon = config.icon;
          
          return (
            <div key={doc.id} className="flex items-center justify-between p-3 border border-border rounded-lg hover:border-church-gold/30 transition-colors">
              <div className="flex items-center space-x-3 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.bg}`}>
                  <Icon className={config.color} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground text-sm">{doc.name}</h4>
                    {!doc.required && (
                      <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">Optional</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{doc.type}</p>
                  <p className="text-xs text-muted-foreground">{doc.uploaded}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-xs font-medium ${config.color}`}>{config.label}</div>
                <div className="text-xs text-muted-foreground">{doc.date}</div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 church-button flex items-center justify-center space-x-2">
        <Upload size={16} />
        <span>Upload Documents</span>
      </button>
    </div>
  );
}