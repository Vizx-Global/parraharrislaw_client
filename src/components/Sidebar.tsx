import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FileText,
  MessageSquare,
  DollarSign,
  Calendar,
  Folder,
  CreditCard,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useLocation, Link, useNavigate } from "react-router-dom";
const CompanyLogo = "https://res.cloudinary.com/dvkt0lsqb/image/upload/v1769451969/PARRA_HARRIS_Logo_seakof.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
}

interface NavigationItem {
  name: string;
  href?: string;
  icon: React.ComponentType<any>;
  badge?: number | string | null;
  children?: NavigationItem[];
  section?: string;
}

const navigation: NavigationItem[] = [
  {
    name: "Overview",
    href: "/advance-plan-dashboard",
    icon: Home,
    section: "Dashboard Overview",
  },
  {
    name: "Review Plan Info",
    href: "/dashboard/parenting-plan/questionnaire",
    icon: FileText,
    section: "Questionnaire",
  },
  {
    name: "Attorney Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
    section: "Communications",
    badge: 2, // Placeholder
  },
  {
    name: "Case Management",
    icon: Folder,
    section: "Case Management",
    children: [
      { name: "Documents", href: "/dashboard/documents", icon: Folder },
      { name: "Financial Info", href: "/dashboard/financial", icon: DollarSign },
    ],
  },
  {
    name: "Services",
    icon: Calendar,
    section: "Services",
    children: [
      { name: "Consultation", href: "/dashboard/consultation", icon: Calendar },
      { name: "Billing & Receipts", href: "/dashboard/billing", icon: CreditCard },
      { name: "Support", href: "/dashboard/support", icon: HelpCircle },
    ],
  },
];

// Group navigation items by section
const groupedNavigation = navigation.reduce((acc, item) => {
  const section = item.section || "Uncategorized";
  if (!acc[section]) {
    acc[section] = [];
  }
  acc[section].push(item);
  return acc;
}, {} as Record<string, NavigationItem[]>);

export default function Sidebar({ isOpen, onClose, isCollapsed }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "Case Management",
    "Services",
  ]);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleExpanded = (itemName: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((name) => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ 
          width: isCollapsed ? 80 : 280,
          x: isOpen || window.innerWidth >= 1024 ? 0 : -280 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 bg-sidebar border-r border-sidebar-border shadow-elegant lg:static flex flex-col h-full overflow-hidden",
          !isOpen && "lg:flex"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border bg-sidebar h-[81px]">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                onClick={handleLogoClick}
                className="flex items-center space-x-2"
              >
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center p-1 overflow-hidden">
                  <img src={CompanyLogo} alt="Logo" className="w-full h-full object-contain filter brightness-0 invert" />
                </div>
                <span className="font-bold text-lg text-sidebar-foreground truncate">Parra Harris</span>
              </motion.button>
            )}
            {isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center w-full"
              >
                <button
                  onClick={handleLogoClick}
                  className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center p-1 overflow-hidden hover-lift"
                >
                  <img src={CompanyLogo} alt="Logo" className="w-full h-full object-contain filter brightness-0 invert" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-6 overflow-y-auto custom-scrollbar">
          {Object.entries(groupedNavigation).map(([section, items]) => (
            <div key={section} className="space-y-2">
              {!isCollapsed && section !== "Uncategorized" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest px-3"
                >
                  {section}
                </motion.div>
              )}

              <div className="space-y-1">
                {items.map((item) => {
                  const isItemActive = isActive(item.href);
                  const hasChildren = item.children && item.children.length > 0;

                  return (
                    <div key={item.name} className="relative">
                      {hasChildren ? (
                        <div>
                          <Button
                            variant={expandedItems.includes(item.name) ? "secondary" : "ghost"}
                            className={cn(
                              "w-full justify-start hover-lift transition-smooth",
                              isCollapsed ? "px-2" : "px-3",
                              expandedItems.includes(item.name) && "bg-sidebar-accent text-sidebar-accent-foreground"
                            )}
                            onClick={() => toggleExpanded(item.name)}
                          >
                            <item.icon
                              className={cn("w-4 h-4", isCollapsed ? "" : "mr-3")}
                            />
                            {!isCollapsed && (
                              <>
                                <span className="flex-1 text-left text-sm font-medium">{item.name}</span>
                                <ChevronRight
                                  className={cn(
                                    "w-4 h-4 transition-transform duration-200",
                                    expandedItems.includes(item.name) && "rotate-90"
                                  )}
                                />
                              </>
                            )}
                          </Button>

                          <AnimatePresence>
                            {!isCollapsed && expandedItems.includes(item.name) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 mt-1 space-y-1 overflow-hidden border-l border-sidebar-border pl-3"
                              >
                                {item.children?.map((child) => (
                                  <Button
                                    key={child.name}
                                    variant={isActive(child.href) ? "default" : "ghost"}
                                    size="sm"
                                    asChild
                                    className={cn(
                                      "w-full justify-start hover-lift transition-smooth",
                                      isActive(child.href) &&
                                        "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 shadow-md"
                                    )}
                                  >
                                    <Link to={child.href!} onClick={() => isOpen && onClose()}>
                                      <child.icon className="w-3 h-3 mr-3" />
                                      <span className="text-xs font-medium">{child.name}</span>
                                    </Link>
                                  </Button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Button
                          variant={isItemActive ? "default" : "ghost"}
                          className={cn(
                            "w-full justify-start hover-lift transition-smooth",
                            isCollapsed ? "px-2" : "px-3",
                            isItemActive &&
                              "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 shadow-md"
                          )}
                          asChild
                        >
                          <Link to={item.href!} onClick={() => isOpen && onClose()}>
                            <item.icon
                              className={cn("w-4 h-4", isCollapsed ? "" : "mr-3")}
                            />
                            {!isCollapsed && (
                              <>
                                <span className="flex-1 text-left text-sm font-medium">{item.name}</span>
                                {item.badge && (
                                  <Badge
                                    variant="secondary"
                                    className={cn(
                                      "ml-auto",
                                      item.badge > 0 && "notification-pulse"
                                    )}
                                  >
                                    {item.badge}
                                  </Badge>
                                )}
                              </>
                            )}
                          </Link>
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>

              {!isCollapsed && section !== "Services" && (
                <Separator className="my-2 bg-sidebar-border/50" />
              )}
            </div>
          ))}
        </div>

        {/* User Info & Footer */}
        <div className="p-4 border-t border-sidebar-border bg-sidebar/50">
          {!isCollapsed ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-sidebar-accent/50 rounded-xl border border-sidebar-border"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold shadow-md">
                  <User className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-sidebar-foreground truncate">Admin User</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-tight truncate">
                    Advanced Plan Client
                  </p>
                </div>
              </div>
              <Separator className="my-3 bg-sidebar-border" />
              <div className="text-[10px] text-muted-foreground text-center font-medium">
                Parra Harris Law v1.0
              </div>
            </motion.div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-white font-semibold hover-lift shadow-md">
                <User className="w-5 h-5" />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}