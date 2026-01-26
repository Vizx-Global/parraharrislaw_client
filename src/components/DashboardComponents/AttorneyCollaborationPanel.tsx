import { MessageSquare, Phone, Calendar, FileText, Award, Clock } from 'lucide-react';
import CompanyLogo from '@/assets/PARRA HARRIS Logo.png';
import { useNavigate } from 'react-router-dom';

export default function AttorneyCollaborationPanel() {
  const navigate = useNavigate();
  const attorney = {
    name: 'Parra Harris, Esq.',
    specialty: 'Family Law Specialist',
    experience: '15+ years',
    rating: '4.9/5.0',
    responseTime: 'Usually within 2 hours',
    barAdmissions: ['Florida Bar', 'New York Bar'],
    education: 'J.D., Harvard Law School',
    firm: 'Harris Family Law Group'
  };

  const recentActivities = [
    { type: 'message', text: 'Reviewed your financial questions', time: '2 hours ago' },
    { type: 'document', text: 'Added comments to custody section', time: 'Yesterday' },
    { type: 'review', text: 'Completed initial plan analysis', time: '2 days ago' }
  ];

  return (
    <div className="church-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Your Legal Team</h2>
          <p className="text-muted-foreground">Direct collaboration with your assigned attorney</p>
        </div>
        <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium">Active & Available</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-church-navy to-primary-glow rounded-xl p-6 text-white text-center">
            <div className="w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-4 p-2">
              <img 
                src={CompanyLogo} 
                alt="Harris Family Law Group" 
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            
            <h3 className="text-xl font-bold mb-1">{attorney.name}</h3>
            <p className="text-church-light-blue mb-1">{attorney.specialty}</p>
            <p className="text-church-light-blue text-sm mb-3">{attorney.firm}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <Award className="w-4 h-4 text-church-gold" />
                <span>{attorney.experience} experience</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Clock className="w-4 h-4 text-church-gold" />
                <span>{attorney.responseTime}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-church-light-blue/20">
              <p className="text-xs text-church-light-blue mb-2">Bar Admissions:</p>
              <div className="flex flex-wrap justify-center gap-1">
                {attorney.barAdmissions.map((bar, index) => (
                  <span key={index} className="text-xs bg-church-gold/20 text-church-gold px-2 py-1 rounded">
                    {bar}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <button 
              onClick={() => navigate('/dashboard/messages')}
              className="flex flex-col items-center p-4 border-2 border-church-gold rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors group"
            >
              <MessageSquare className="w-8 h-8 text-church-gold mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-foreground">Send Message</span>
              <span className="text-xs text-muted-foreground mt-1">Secure chat</span>
            </button>
            
            <button 
              onClick={() => navigate('/dashboard/consultation')}
              className="flex flex-col items-center p-4 border-2 border-border rounded-xl hover:border-church-gold/30 hover:bg-orange-50 transition-colors group"
            >
              <Phone className="w-8 h-8 text-church-navy mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-foreground">Request Call</span>
              <span className="text-xs text-muted-foreground mt-1">15-min callback</span>
            </button>
            
            <button 
              onClick={() => navigate('/dashboard/consultation')}
              className="flex flex-col items-center p-4 border-2 border-border rounded-xl hover:border-church-gold/30 hover:bg-orange-50 transition-colors group"
            >
              <Calendar className="w-8 h-8 text-church-navy mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-foreground">Schedule Meeting</span>
              <span className="text-xs text-muted-foreground mt-1">Video conference</span>
            </button>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-foreground mb-3">Attorney Credentials</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-muted-foreground">Education:</span>
                <p className="text-foreground">{attorney.education}</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Client Rating:</span>
                <p className="text-foreground">{attorney.rating} (87 reviews)</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Specialization:</span>
                <p className="text-foreground">Family Law, Child Custody, Co-Parenting</p>
              </div>
              <div>
                <span className="font-medium text-muted-foreground">Languages:</span>
                <p className="text-foreground">English, Spanish</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Recent Attorney Activity</h4>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <FileText className="w-4 h-4 text-church-navy flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{activity.text}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
