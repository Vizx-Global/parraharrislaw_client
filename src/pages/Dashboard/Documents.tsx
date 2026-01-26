import DashboardLayout from '@/components/DashboardLayout';
import { Folder, File, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Documents() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    plan: 'advanced' as const
  };

  const docs = [
    { name: 'Initial Filing.pdf', date: '2024-01-15', size: '1.2 MB' },
    { name: 'Financial Affidavit.pdf', date: '2024-01-20', size: '2.5 MB' },
    { name: 'Marriage Certificate.jpg', date: '2024-01-10', size: '0.8 MB' },
  ];

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-sidebar-primary">Documents</h1>
            <p className="text-muted-foreground">Manage and upload your case documents securely.</p>
          </div>
          <Button className="bg-church-gold hover:bg-church-gold/90">
            <Upload className="w-4 h-4 mr-2" />
            Upload New
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.map((doc) => (
            <div key={doc.name} className="p-4 bg-card border rounded-xl shadow-soft hover-lift group">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-church-navy/5 rounded-lg text-church-navy">
                    <File className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm truncate max-w-[150px]">{doc.name}</h3>
                    <p className="text-[10px] text-muted-foreground">{doc.date} • {doc.size}</p>
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-church-gold transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          <div className="p-4 bg-muted/20 border-2 border-dashed rounded-xl flex flex-col items-center justify-center min-h-[100px] text-muted-foreground hover:border-church-gold transition-colors cursor-pointer">
            <Folder className="w-8 h-8 mb-2 opacity-50" />
            <span className="text-xs font-medium">Add Folder</span>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
