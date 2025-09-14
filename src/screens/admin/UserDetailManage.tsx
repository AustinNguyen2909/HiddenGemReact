import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard } from '../../components';
import { users, User } from '../../dummyData';
import './UserDetailManage.css';

interface UserDetailManageProps {
  className?: string;
}

const UserDetailManage: React.FC<UserDetailManageProps> = ({ className = '' }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<User>>({});

  useEffect(() => {
    if (id) {
      const foundUser = users.find(u => u.id === parseInt(id));
      if (foundUser) {
        setUser(foundUser);
        setEditForm(foundUser);
      }
    }
  }, [id]);

  if (!user) {
    return (
      <div className={`user-detail-manage ${className}`}>
        <div className="user-detail-manage__not-found">
          <Title level="h1" size="xl" color="primary">
            User Not Found
          </Title>
          <Text variant="p" size="md" color="secondary">
            The user you're looking for doesn't exist.
          </Text>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/admin/users')}
            className="user-detail-manage__back-btn"
          >
            Back to Users
          </Button>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Saving user:', editForm);
    setIsEditing(false);
    // Update the user state with the edited data
    setUser({ ...user, ...editForm });
  };

  const handleCancel = () => {
    setEditForm(user);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof User, value: any) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getStatusBadge = (status: string) => {
    return (
      <span className={`user-detail-manage__status-badge user-detail-manage__status-badge--${status}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    return (
      <span className={`user-detail-manage__role-badge user-detail-manage__role-badge--${role}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'activity', label: 'Activity', icon: '📈' },
    { id: 'orders', label: 'Orders', icon: '🛒' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderOverview = () => (
    <div className="user-detail-manage__overview">
      <div className="user-detail-manage__stats-grid">
        <AdminStatsCard
          title="Total Orders"
          value={user.totalOrders.toString()}
          icon="🛒"
          trend={{ value: 5, isPositive: true }}
        />
        <AdminStatsCard
          title="Total Spent"
          value={`$${user.totalSpent.toFixed(2)}`}
          icon="💰"
          trend={{ value: 12, isPositive: true }}
        />
        <AdminStatsCard
          title="Favorite Stores"
          value={user.favoriteStores.length.toString()}
          icon="❤️"
          trend={{ value: 2, isPositive: true }}
        />
        <AdminStatsCard
          title="Days Active"
          value="45"
          icon="📅"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      <div className="user-detail-manage__info-cards">
        <div className="user-detail-manage__info-card">
          <Title level="h3" size="md" color="primary">
            Account Status
          </Title>
          <div className="user-detail-manage__status-info">
            {getStatusBadge(user.status)}
            {getRoleBadge(user.role)}
          </div>
        </div>

        <div className="user-detail-manage__info-card">
          <Title level="h3" size="md" color="primary">
            Contact Information
          </Title>
          <div className="user-detail-manage__contact-info">
            <Text variant="p" size="sm" color="primary">
              📧 {user.email}
            </Text>
            <Text variant="p" size="sm" color="primary">
              📞 {user.phone}
            </Text>
            <Text variant="p" size="sm" color="primary">
              📍 {user.location.city}, {user.location.state}
            </Text>
          </div>
        </div>

        <div className="user-detail-manage__info-card">
          <Title level="h3" size="md" color="primary">
            Account Details
          </Title>
          <div className="user-detail-manage__account-info">
            <Text variant="p" size="sm" color="primary">
              <strong>Joined:</strong> {new Date(user.joinDate).toLocaleDateString()}
            </Text>
            <Text variant="p" size="sm" color="primary">
              <strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleDateString()}
            </Text>
            <Text variant="p" size="sm" color="primary">
              <strong>Member for:</strong> {Math.floor((new Date().getTime() - new Date(user.joinDate).getTime()) / (1000 * 60 * 60 * 24))} days
            </Text>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="user-detail-manage__profile">
      <div className="user-detail-manage__form-section">
        <Title level="h3" size="lg" color="primary">
          User Profile
        </Title>
        
        <div className="user-detail-manage__form-grid">
          <div className="user-detail-manage__form-group">
            <label className="user-detail-manage__label">First Name</label>
            <Input
              type="text"
              value={isEditing ? editForm.firstName || '' : user.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              disabled={!isEditing}
              className="user-detail-manage__input"
            />
          </div>

          <div className="user-detail-manage__form-group">
            <label className="user-detail-manage__label">Last Name</label>
            <Input
              type="text"
              value={isEditing ? editForm.lastName || '' : user.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              disabled={!isEditing}
              className="user-detail-manage__input"
            />
          </div>

          <div className="user-detail-manage__form-group">
            <label className="user-detail-manage__label">Email</label>
            <Input
              type="email"
              value={isEditing ? editForm.email || '' : user.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              className="user-detail-manage__input"
            />
          </div>

          <div className="user-detail-manage__form-group">
            <label className="user-detail-manage__label">Phone</label>
            <Input
              type="text"
              value={isEditing ? editForm.phone || '' : user.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
              className="user-detail-manage__input"
            />
          </div>

          <div className="user-detail-manage__form-group">
            <label className="user-detail-manage__label">City</label>
            <Input
              type="text"
              value={isEditing ? editForm.location?.city || '' : user.location.city}
              onChange={(e) => handleInputChange('location', { ...user.location, city: e.target.value })}
              disabled={!isEditing}
              className="user-detail-manage__input"
            />
          </div>

          <div className="user-detail-manage__form-group">
            <label className="user-detail-manage__label">State</label>
            <Input
              type="text"
              value={isEditing ? editForm.location?.state || '' : user.location.state}
              onChange={(e) => handleInputChange('location', { ...user.location, state: e.target.value })}
              disabled={!isEditing}
              className="user-detail-manage__input"
            />
          </div>

          <div className="user-detail-manage__form-group">
            <label className="user-detail-manage__label">Role</label>
            <select
              value={isEditing ? editForm.role || 'customer' : user.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              disabled={!isEditing}
              className="user-detail-manage__select"
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>

          <div className="user-detail-manage__form-group">
            <label className="user-detail-manage__label">Status</label>
            <select
              value={isEditing ? editForm.status || 'active' : user.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              disabled={!isEditing}
              className="user-detail-manage__select"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="user-detail-manage__form-actions">
          {isEditing ? (
            <>
              <Button
                variant="primary"
                size="md"
                onClick={handleSave}
                className="user-detail-manage__save-btn"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={handleCancel}
                className="user-detail-manage__cancel-btn"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleEdit}
              className="user-detail-manage__edit-btn"
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="user-detail-manage__activity">
      <Title level="h3" size="lg" color="primary">
        User Activity
      </Title>
      
      <div className="user-detail-manage__activity-placeholder">
        <Text variant="p" size="md" color="muted">
          Activity tracking would go here. This would include:
        </Text>
        <ul className="user-detail-manage__feature-list">
          <li>Login history and patterns</li>
          <li>Recent actions and interactions</li>
          <li>Page views and navigation</li>
          <li>Feature usage statistics</li>
          <li>Time spent on platform</li>
        </ul>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="user-detail-manage__orders">
      <div className="user-detail-manage__section-header">
        <Title level="h3" size="lg" color="primary">
          Order History
        </Title>
        <Text variant="p" size="md" color="secondary">
          Total Orders: {user.totalOrders} | Total Spent: ${user.totalSpent.toFixed(2)}
        </Text>
      </div>
      
      <div className="user-detail-manage__orders-placeholder">
        <Text variant="p" size="md" color="muted">
          Order management would go here. This would include:
        </Text>
        <ul className="user-detail-manage__feature-list">
          <li>Order listing with details and status</li>
          <li>Order history and tracking</li>
          <li>Refund and return management</li>
          <li>Order analytics and insights</li>
        </ul>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="user-detail-manage__settings">
      <Title level="h3" size="lg" color="primary">
        User Settings
      </Title>
      
      <div className="user-detail-manage__settings-placeholder">
        <Text variant="p" size="md" color="muted">
          Settings management would go here. This would include:
        </Text>
        <ul className="user-detail-manage__feature-list">
          <li>Notification preferences</li>
          <li>Privacy settings</li>
          <li>Account security options</li>
          <li>Data export and deletion</li>
          <li>Communication preferences</li>
        </ul>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'profile':
        return renderProfile();
      case 'activity':
        return renderActivity();
      case 'orders':
        return renderOrders();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className={`user-detail-manage ${className}`}>
      <div className="user-detail-manage__header">
        <div className="user-detail-manage__header-left">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/admin/users')}
            className="user-detail-manage__back-btn"
          >
            ← Back to Users
          </Button>
          <div className="user-detail-manage__title-section">
            <Title level="h1" size="xl" color="primary" className="user-detail-manage__title">
              {user.firstName} {user.lastName}
            </Title>
            <Text variant="p" size="md" color="secondary" className="user-detail-manage__subtitle">
              {user.email} • {user.location.city}, {user.location.state}
            </Text>
          </div>
        </div>
        
        <div className="user-detail-manage__header-right">
          <div className="user-detail-manage__user-avatar">
            <img src={user.avatar} alt={`${user.firstName} ${user.lastName}`} className="user-detail-manage__avatar-img" />
          </div>
        </div>
      </div>

      <div className="user-detail-manage__tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`user-detail-manage__tab ${
              activeTab === tab.id ? 'user-detail-manage__tab--active' : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="user-detail-manage__tab-icon">{tab.icon}</span>
            <Text variant="span" size="sm" color={activeTab === tab.id ? 'primary' : 'muted'}>
              {tab.label}
            </Text>
          </button>
        ))}
      </div>

      <div className="user-detail-manage__content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default UserDetailManage;
