import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, AdminStatsCard } from '../../components';
import './AdminDashboard.css';

interface AdminDashboardProps {
  className?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const statsData = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: '👥',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Coffee Shops',
      value: '89',
      icon: '🏪',
      trend: { value: 5, isPositive: true }
    },
    {
      title: 'Active Promotions',
      value: '12',
      icon: '🎯',
      trend: { value: 3, isPositive: false }
    },
    {
      title: 'Reviews',
      value: '5,678',
      icon: '💬',
      trend: { value: 8, isPositive: true }
    }
  ];

  const quickActions = [
    { label: 'Manage Coffee Shops', path: '/admin/coffee-shops', icon: '🏪' },
    { label: 'Create Promotion', path: '/admin/promotions', icon: '🎯' },
    { label: 'View Analytics', path: '/admin/analytics', icon: '📈' },
    { label: 'User Management', path: '/admin/users', icon: '👥' }
  ];

  const handleQuickAction = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`admin-dashboard ${className}`}>
      <div className="admin-dashboard__welcome">
        <Title level="h1" size="xl" color="primary" className="admin-dashboard__title">
          Welcome back, Admin! 👋
        </Title>
        <Text variant="p" size="md" color="secondary" className="admin-dashboard__subtitle">
          Here's what's happening with your coffee shop platform today.
        </Text>
      </div>

      <div className="admin-dashboard__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="admin-dashboard__stat-card"
          />
        ))}
      </div>

      <div className="admin-dashboard__sections">
        <div className="admin-dashboard__section">
          <Title level="h2" size="lg" color="primary" className="admin-dashboard__section-title">
            Quick Actions
          </Title>
          <Text variant="p" size="md" color="secondary" className="admin-dashboard__section-description">
            Manage your platform efficiently with these quick access tools.
          </Text>
          <div className="admin-dashboard__actions-grid">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="primary"
                size="lg"
                onClick={() => handleQuickAction(action.path)}
                className="admin-dashboard__action-btn"
              >
                <span className="admin-dashboard__action-icon">{action.icon}</span>
                {action.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="admin-dashboard__section">
          <Title level="h2" size="lg" color="primary" className="admin-dashboard__section-title">
            Recent Activity
          </Title>
          <Text variant="p" size="md" color="secondary" className="admin-dashboard__section-description">
            Latest updates and activities on your platform.
          </Text>
          <div className="admin-dashboard__activity-list">
            <div className="admin-dashboard__activity-item">
              <div className="admin-dashboard__activity-icon">🆕</div>
              <div className="admin-dashboard__activity-content">
                <Text variant="p" size="sm" color="primary" className="admin-dashboard__activity-text">
                  New coffee shop "Brew & Beans" registered
                </Text>
                <Text variant="p" size="xs" color="secondary" className="admin-dashboard__activity-time">
                  2 hours ago
                </Text>
              </div>
            </div>
            <div className="admin-dashboard__activity-item">
              <div className="admin-dashboard__activity-icon">⭐</div>
              <div className="admin-dashboard__activity-content">
                <Text variant="p" size="sm" color="primary" className="admin-dashboard__activity-text">
                  5 new reviews received for "Coffee Corner"
                </Text>
                <Text variant="p" size="xs" color="secondary" className="admin-dashboard__activity-time">
                  4 hours ago
                </Text>
              </div>
            </div>
            <div className="admin-dashboard__activity-item">
              <div className="admin-dashboard__activity-icon">🎯</div>
              <div className="admin-dashboard__activity-content">
                <Text variant="p" size="sm" color="primary" className="admin-dashboard__activity-text">
                  "Summer Special" promotion created
                </Text>
                <Text variant="p" size="xs" color="secondary" className="admin-dashboard__activity-time">
                  6 hours ago
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
