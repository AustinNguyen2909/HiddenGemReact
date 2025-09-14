import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Text } from '../';
import './index.css';

interface AdminHeaderProps {
  className?: string;
}

interface BreadcrumbItem {
  label: string;
  path?: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Get admin user from localStorage
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');

  // Generate breadcrumbs based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Admin', path: '/admin' }];

    if (pathSegments.length > 1) {
      const currentPage = pathSegments[1];
      const pageLabels: { [key: string]: string } = {
        'users': 'Users',
        'coffee-shops': 'Coffee Shops',
        'promotions': 'Promotions',
        'reviews': 'Reviews',
        'analytics': 'Analytics',
        'settings': 'Settings'
      };

      if (pageLabels[currentPage]) {
        breadcrumbs.push({
          label: pageLabels[currentPage],
          path: `/admin/${currentPage}`
        });
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  const handleLogout = () => {
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const handleBreadcrumbClick = (path: string) => {
    navigate(path);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className={`admin-header ${className}`}>
      <div className="admin-header__left">
        <div className="admin-header__breadcrumbs">
          {breadcrumbs.map((item, index) => (
            <div key={index} className="admin-header__breadcrumb">
              {item.path && index < breadcrumbs.length - 1 ? (
                <button
                  className="admin-header__breadcrumb-link"
                  onClick={() => handleBreadcrumbClick(item.path!)}
                >
                  <Text variant="span" size="sm" color="secondary">
                    {item.label}
                  </Text>
                </button>
              ) : (
                <Text variant="span" size="sm" color="primary" className="admin-header__breadcrumb-current">
                  {item.label}
                </Text>
              )}
              {index < breadcrumbs.length - 1 && (
                <Text variant="span" size="sm" color="muted" className="admin-header__breadcrumb-separator">
                  /
                </Text>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="admin-header__right">
        <div className="admin-header__user-info">
          <div className="admin-header__user-avatar">
            <Text variant="span" size="md" color="primary" className="admin-header__user-avatar-text">
              {adminUser.name ? adminUser.name.charAt(0).toUpperCase() : 'A'}
            </Text>
          </div>
          <div className="admin-header__user-details">
            <Text variant="p" size="sm" color="primary" className="admin-header__user-name">
              {adminUser.name || 'Admin User'}
            </Text>
            <Text variant="p" size="xs" color="secondary" className="admin-header__user-role">
              Administrator
            </Text>
          </div>
          <button
            className="admin-header__user-menu-toggle"
            onClick={toggleUserMenu}
            aria-label="Toggle user menu"
          >
            <Text variant="span" size="sm" color="secondary">
              ▼
            </Text>
          </button>
        </div>

        {showUserMenu && (
          <div className="admin-header__user-menu">
            <div className="admin-header__user-menu-content">
              <button
                className="admin-header__user-menu-item"
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/admin/profile');
                }}
              >
                <Text variant="span" size="sm" color="primary">
                  Profile Settings
                </Text>
              </button>
              <button
                className="admin-header__user-menu-item"
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/admin/settings');
                }}
              >
                <Text variant="span" size="sm" color="primary">
                  System Settings
                </Text>
              </button>
              <div className="admin-header__user-menu-divider"></div>
              <button
                className="admin-header__user-menu-item admin-header__user-menu-item--logout"
                onClick={handleLogout}
              >
                <Text variant="span" size="sm" color="black">
                  Logout
                </Text>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
