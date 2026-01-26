// components/dashboard/TopBar.tsx
import { Bell, Menu, Search, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  user: {
    name: string;
    email: string;
  };
  onMenuClick: () => void;
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export default function TopBar({ user, onMenuClick, onToggleSidebar, sidebarCollapsed }: TopBarProps) {
  const navigate = useNavigate();
  const progress = 35; // Example progress
  
  return (
    <header className="bg-white border-b border-border shadow-soft">
      <div className="flex items-center justify-between p-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Desktop Sidebar Toggle Button */}
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex p-2 bg-church-gold hover:bg-church-gold/90 rounded-lg transition-colors"
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? (
              <ChevronRight size={20} className="text-white" />
            ) : (
              <ChevronLeft size={20} className="text-white" />
            )}
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center bg-muted rounded-lg px-3 py-2">
            <Search size={18} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none outline-none ml-2 text-sm w-48"
            />
          </div>

          {/* Notifications */}
          <button 
            onClick={() => navigate('/dashboard/support')}
            className="relative p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Bell size={20} className="text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-church-gold rounded-full" />
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors cursor-pointer">
            <div className="w-8 h-8 bg-church-light-blue rounded-full flex items-center justify-center">
              <User size={16} className="text-church-navy" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">Advanced Plan</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}