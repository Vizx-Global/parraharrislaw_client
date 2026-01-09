// components/dashboard/DashboardOverview.tsx
import WelcomeBanner from './DashboardComponents/WelcomeBanner';
import PlanProgressTracker from './DashboardComponents/PlanProgressTracker';
import ActionCardsGrid from './DashboardComponents/ActionCardsGrid';
import AttorneyCollaborationPanel from './DashboardComponents/AttorneyCollaborationPanel';
import ConsultationOverview from './DashboardComponents/ConsultationOverview';
import FinancialDocumentsStatus from './DashboardComponents/FinancialDocumentsStatus';
import RecentActivityTimeline from './DashboardComponents/RecentActivityTimeline';
import DocumentStatusPanel from './DashboardComponents/DocumentStatusPanel';

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Welcome & Status Overview */}
      <WelcomeBanner />
      
      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Progress & Actions */}
        <div className="xl:col-span-2 space-y-8">
          {/* Plan Progress & Milestones */}
          <PlanProgressTracker />
          
          {/* Action Cards Grid */}
          <ActionCardsGrid />
          
          {/* Attorney Collaboration */}
          <AttorneyCollaborationPanel />
        </div>
        
        {/* Right Column - Status & Updates */}
        <div className="space-y-8">
          {/* Consultation Overview */}
          <ConsultationOverview />
          
          {/* Financial Documents Status */}
          <FinancialDocumentsStatus />
          
          {/* Document Status */}
          <DocumentStatusPanel />
          
          {/* Recent Activity */}
          <RecentActivityTimeline />
        </div>
      </div>
    </div>
  );
}