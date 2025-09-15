import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSidebar, AdminHeader } from '../../components';
import './AdminLayout.css';
import { useAuth } from '../../components/AuthProvider';

interface AdminLayoutProps {
  className?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ className = '' }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const isLoginRoute = location.pathname === '/admin/login';
  const isAdmin = isAuthenticated && user?.role === 'admin';
  const showChrome = isAdmin && !isLoginRoute;

  return (
    <div className={`admin-layout ${className}`}>
      {showChrome && <AdminSidebar className="admin-layout__sidebar" />}
      {showChrome && <AdminHeader className="admin-layout__header" />}
      <main className={showChrome ? 'admin-layout__main' : 'admin-layout__main__not-logged-in'}>
        <div className="admin-layout__content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
