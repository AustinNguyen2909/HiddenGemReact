import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar, AdminHeader } from '../../components';
import './AdminLayout.css';

interface AdminLayoutProps {
  className?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ className = '' }) => {
  return (
    <div className={`admin-layout ${className}`}>
      <AdminSidebar className="admin-layout__sidebar" />
      <AdminHeader className="admin-layout__header" />
      <main className="admin-layout__main">
        <div className="admin-layout__content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
