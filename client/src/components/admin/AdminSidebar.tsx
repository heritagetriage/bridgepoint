import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";

interface AdminSidebarProps {
  onLogout: () => void;
}

export default function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
      exact: true,
    },
    {
      title: "Calendar",
      href: "/admin/calendar",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Events",
      href: "/admin/events",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  const isActive = (path: string, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const sidebar = (
    <div
      className={cn(
        "h-full flex flex-col bg-black bg-opacity-30 backdrop-blur-lg border border-gray-200 rounded-lg transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        {!isCollapsed && (
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary">BridgePoint</span>
          </div>
        )}
        {isDesktop && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            <ChevronRight
              className={cn(
                "h-5 w-5 transition-transform",
                isCollapsed ? "rotate-180" : "rotate-0"
              )}
            />
          </Button>
        )}
      </div>

      <ScrollArea className="flex-1">
        <div className="px-3 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.href, item.exact)
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
                  isCollapsed && "justify-center"
                )}
                onClick={() => {
                  if (!isDesktop) {
                    setIsMobileOpen(false);
                  }
                }}
              >
                {item.icon}
                {!isCollapsed && <span className="ml-3">{item.title}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20",
            isCollapsed && "justify-center"
          )}
          onClick={onLogout}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {!isDesktop && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 lg:hidden"
          onClick={toggleMobileSidebar}
        >
          {isMobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      )}

      {/* Desktop Sidebar */}
      {isDesktop && sidebar}

      {/* Mobile Sidebar */}
      {!isDesktop && (
        <div
          className={cn(
            "fixed inset-0 z-40 lg:hidden transition-transform transform",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div
            className="fixed inset-0 bg-black/50"
            onClick={toggleMobileSidebar}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-[250px] overflow-y-auto">
            {sidebar}
          </div>
        </div>
      )}
    </>
  );
}
