import { FileText, CheckCircle, Clock, Edit, Download, Share2 } from 'lucide-react';

const documents = [
  {
    id: 1,
    name: 'Parenting Plan Draft',
    version: 'v2.1',
    status: 'under-review',
    lastUpdated: '2 hours ago',
    size: '2.4 MB',
    actions: ['download', 'share'],
    reviewedBy: 'Sarah Johnson'
  },
  {
    id: 2,
    name: 'Financial Affidavit',
    version: 'v1.0',
    status: 'completed',
    lastUpdated: '1 day ago',
    size: '1.2 MB',
    actions: ['download', 'share'],
    reviewedBy: 'System Generated'
  },
  {
    id: 3,
    name: 'Child Support Worksheet',
    version: 'Draft',
    status: 'in-progress',
    lastUpdated: '3 days ago',
    size: '0.8 MB',
    actions: ['edit'],
    reviewedBy: 'Pending'
  },
  {
    id: 4,
    name: 'Medical Consent Form',
    version: 'Template',
    status: 'not-started',
    lastUpdated: 'Not created',
    size: '—',
    actions: ['create'],
    reviewedBy: '—'
  }
];

const statusConfig = {
  'under-review': { color: 'text-church-gold', label: 'Under Review', icon: Clock },
  'completed': { color: 'text-green-600', label: 'Completed', icon: CheckCircle },
  'in-progress': { color: 'text-blue-600', label: 'In Progress', icon: Edit },
  'not-started': { color: 'text-gray-400', label: 'Not Started', icon: FileText }
};

export default function DocumentStatusPanel() {
  return (
    <div className="church-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Document Status</h2>
          <p className="text-muted-foreground">Your parenting plan documents</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <FileText size={16} />
          <span>{documents.filter(d => d.status === 'completed').length} of {documents.length} ready</span>
        </div>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => {
          const config = statusConfig[doc.status as keyof typeof statusConfig];
          const Icon = config.icon;

          return (
            <div key={doc.id} className="border border-border rounded-lg p-4 hover:border-church-gold/30 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-church-navy" />
                  <div>
                    <h3 className="font-semibold text-foreground">{doc.name}</h3>
                    <p className="text-xs text-muted-foreground">Version {doc.version} • {doc.size}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${config.color} bg-opacity-10`}>
                  {config.label}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-muted-foreground">Last updated: {doc.lastUpdated}</p>
                  <p className="text-muted-foreground">Reviewed by: {doc.reviewedBy}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  {doc.actions.includes('download') && (
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Download">
                      <Download size={16} className="text-church-navy" />
                    </button>
                  )}
                  {doc.actions.includes('share') && (
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Share">
                      <Share2 size={16} className="text-church-navy" />
                    </button>
                  )}
                  {doc.actions.includes('edit') && (
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors" title="Edit">
                      <Edit size={16} className="text-church-navy" />
                    </button>
                  )}
                  {doc.actions.includes('create') && (
                    <button className="text-xs church-button-outline py-1 px-2">
                      Create
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="church-button-outline py-2 text-sm flex items-center justify-center space-x-2">
          <Download size={16} />
          <span>Download All</span>
        </button>
        <button className="church-button py-2 text-sm flex items-center justify-center space-x-2">
          <Share2 size={16} />
          <span>Share Package</span>
        </button>
      </div>
    </div>
  );
}