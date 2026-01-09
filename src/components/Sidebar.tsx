import { 
  Home, 
  FileText, 
  MessageSquare, 
  DollarSign, 
  Calendar, 
  Folder, 
  CreditCard, 
  HelpCircle 
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import CompanyLogo from '@/assets/PARRA HARRIS Logo.png'; 

const menuItems = [
  { icon: Home, label: 'Overview', href: '/advance-plan-dashboard' },
  { 
    icon: FileText, 
    label: 'Review Plan Info', 
    href: '/dashboard/parenting-plan/questionnaire' 
  },
  { icon: MessageSquare, label: 'Attorney Messages', href: '/dashboard/messages' },
  { icon: DollarSign, label: 'Financial Info', href: '/dashboard/financial' },
  { icon: Calendar, label: 'Consultation', href: '/dashboard/consultation' },
  { icon: Folder, label: 'Documents', href: '/dashboard/documents' },
  { icon: CreditCard, label: 'Billing & Receipts', href: '/dashboard/billing' },
  { icon: HelpCircle, label: 'Support', href: '/dashboard/support' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
}

export default function Sidebar({ isOpen, onClose, isCollapsed }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleNavigation = (href: string) => {
    navigate(href);
    // Close mobile sidebar after navigation
    if (isOpen) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar - Fixed positioning that doesn't affect main content flow */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-sidebar border-r border-sidebar-border
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className={`flex items-center ${isCollapsed ? 'justify-center p-4' : 'justify-center p-6'} border-b border-sidebar-border`}>
            {!isCollapsed ? (
              // Expanded state
              <button
                onClick={handleLogoClick}
                className="flex items-center justify-center group"
                aria-label="Parra Harris Law - Home"
              >
                <img 
                  src={CompanyLogo} 
                  alt="Parra Harris Law" 
                  className="h-20 w-auto object-contain rounded-full"
                />
              </button>
            ) : (
              // Collapsed state
              <button
                onClick={handleLogoClick}
                className="flex items-center justify-center"
                aria-label="Parra Harris Law - Home"
              >
                <img 
                  src={CompanyLogo} 
                  alt="Parra Harris Law" 
                  className="h-8 w-8 object-contain rounded"
                />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className={`flex-1 ${isCollapsed ? 'p-2' : 'p-4'} space-y-2`}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`flex items-center text-sidebar-foreground rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors duration-200 w-full ${
                    isCollapsed 
                      ? 'justify-center p-3' 
                      : 'space-x-3 px-4 py-3'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon size={20} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Info */}
          <div className={`${isCollapsed ? 'p-2' : 'p-4'} border-t border-sidebar-border`}>
            <div className={`flex items-center ${isCollapsed ? 'justify-center p-2' : 'space-x-3 p-3'} bg-sidebar-accent rounded-lg`}>
              <div className="w-8 h-8 bg-church-gold rounded-full flex items-center justify-center">
                <span className="text-church-navy text-sm font-semibold">U</span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-sidebar-accent-foreground truncate">
                    User Name
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    Advanced Plan
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}