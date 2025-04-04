import { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import Dashboard from "@/components/admin/Dashboard";
import Calendar from "@/components/admin/Calendar";
import AdminEventList from "@/components/admin/AdminEventList";
import AdminEventForm from "@/components/admin/AdminEventForm";
import AdminMessageList from "@/components/admin/AdminMessageList";
import UserManagement from "@/components/admin/UserManagement";
import Settings from "@/components/admin/Settings";
import AdminLogin from "@/components/admin/AdminLogin";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("adminToken");
    if (token) {
      // Verify token validity here if needed
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="events" element={<AdminEventList />} />
        <Route path="events/new" element={<AdminEventForm />} />
        <Route path="events/edit/:id" element={<AdminEventForm />} />
        <Route path="messages" element={<AdminMessageList />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
