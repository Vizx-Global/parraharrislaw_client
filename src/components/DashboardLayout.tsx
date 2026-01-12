import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './Topbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: {
    name: string;
    email: string;
    plan: 'advanced';
  };
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isCollapsed={sidebarCollapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top Bar */}
        <TopBar
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
          onToggleSidebar={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Main Content Area - Remove the dynamic margin from here */}
        <main className="flex-1 overflow-auto">
          <div className="p-6 w-full max-w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}