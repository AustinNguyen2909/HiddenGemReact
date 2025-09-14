import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard } from '../../components';
import { stores, Store } from '../../dummyData';
import './StoreDetailManage.css';

interface StoreDetailManageProps {
  className?: string;
}

const StoreDetailManage: React.FC<StoreDetailManageProps> = ({ className = '' }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [store, setStore] = useState<Store | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Store>>({});

  useEffect(() => {
    if (id) {
      const foundStore = stores.find(s => s.id === parseInt(id));
      if (foundStore) {
        setStore(foundStore);
        setEditForm(foundStore);
      }
    }
  }, [id]);

  if (!store) {
    return (
      <div className={`store-detail-manage ${className}`}>
        <div className="store-detail-manage__not-found">
          <Title level="h1" size="xl" color="primary">
            Store Not Found
          </Title>
          <Text variant="p" size="md" color="secondary">
            The store you're looking for doesn't exist.
          </Text>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/admin/stores')}
            className="store-detail-manage__back-btn"
          >
            Back to Stores
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
    console.log('Saving store:', editForm);
    setIsEditing(false);
    // Update the store state with the edited data
    setStore({ ...store, ...editForm });
  };

  const handleCancel = () => {
    setEditForm(store);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof Store, value: any) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'details', label: 'Store Details', icon: '🏪' },
    { id: 'products', label: 'Products', icon: '☕' },
    { id: 'reviews', label: 'Reviews', icon: '⭐' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderOverview = () => (
    <div className="store-detail-manage__overview">
      <div className="store-detail-manage__stats-grid">
        <AdminStatsCard
          title="Total Reviews"
          value={store.reviewCount.toString()}
          icon="⭐"
          trend={{ value: 12, isPositive: true }}
        />
        <AdminStatsCard
          title="Average Rating"
          value={store.rating.toFixed(1)}
          icon="📊"
          trend={{ value: 5, isPositive: true }}
        />
        <AdminStatsCard
          title="Products Listed"
          value="24"
          icon="☕"
          trend={{ value: 3, isPositive: true }}
        />
        <AdminStatsCard
          title="Monthly Visitors"
          value="1,234"
          icon="👥"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      <div className="store-detail-manage__info-cards">
        <div className="store-detail-manage__info-card">
          <Title level="h3" size="md" color="primary">
            Store Status
          </Title>
          <div className="store-detail-manage__status-info">
            <div className={`store-detail-manage__status-badge store-detail-manage__status-badge--${store.isActive ? 'active' : 'inactive'}`}>
              {store.isActive ? 'Active' : 'Inactive'}
            </div>
            <div className={`store-detail-manage__status-badge store-detail-manage__status-badge--${store.isOpen ? 'open' : 'closed'}`}>
              {store.isOpen ? 'Open' : 'Closed'}
            </div>
          </div>
        </div>

        <div className="store-detail-manage__info-card">
          <Title level="h3" size="md" color="primary">
            Contact Information
          </Title>
          <div className="store-detail-manage__contact-info">
            <Text variant="p" size="sm" color="primary">
              📞 {store.phone}
            </Text>
            <Text variant="p" size="sm" color="primary">
              ✉️ {store.email}
            </Text>
            <Text variant="p" size="sm" color="primary">
              🕒 {store.hours}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetails = () => (
    <div className="store-detail-manage__details">
      <div className="store-detail-manage__form-section">
        <Title level="h3" size="lg" color="primary">
          Store Information
        </Title>
        
        <div className="store-detail-manage__form-grid">
          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Store Name</label>
            <Input
              type="text"
              value={isEditing ? editForm.name || '' : store.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={!isEditing}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Owner</label>
            <Input
              type="text"
              value={isEditing ? editForm.owner || '' : store.owner}
              onChange={(e) => handleInputChange('owner', e.target.value)}
              disabled={!isEditing}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Address</label>
            <Input
              type="text"
              value={isEditing ? editForm.address || '' : store.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              disabled={!isEditing}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">City</label>
            <Input
              type="text"
              value={isEditing ? editForm.city || '' : store.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              disabled={!isEditing}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">State</label>
            <Input
              type="text"
              value={isEditing ? editForm.state || '' : store.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              disabled={!isEditing}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Zip Code</label>
            <Input
              type="text"
              value={isEditing ? editForm.zipCode || '' : store.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              disabled={!isEditing}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Phone</label>
            <Input
              type="text"
              value={isEditing ? editForm.phone || '' : store.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              disabled={!isEditing}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Email</label>
            <Input
              type="email"
              value={isEditing ? editForm.email || '' : store.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              disabled={!isEditing}
              className="store-detail-manage__input"
            />
          </div>

          <div className="store-detail-manage__form-group">
            <label className="store-detail-manage__label">Hours</label>
            <Input
              type="text"
              value={isEditing ? editForm.hours || '' : store.hours}
              onChange={(e) => handleInputChange('hours', e.target.value)}
              disabled={!isEditing}
              className="store-detail-manage__input"
            />
          </div>
        </div>

        <div className="store-detail-manage__form-actions">
          {isEditing ? (
            <>
              <Button
                variant="primary"
                size="md"
                onClick={handleSave}
                className="store-detail-manage__save-btn"
              >
                Save Changes
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={handleCancel}
                className="store-detail-manage__cancel-btn"
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleEdit}
              className="store-detail-manage__edit-btn"
            >
              Edit Store
            </Button>
          )}
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="store-detail-manage__products">
      <div className="store-detail-manage__section-header">
        <Title level="h3" size="lg" color="primary">
          Store Products
        </Title>
        <Button
          variant="primary"
          size="md"
          className="store-detail-manage__add-product-btn"
        >
          + Add Product
        </Button>
      </div>
      
      <div className="store-detail-manage__products-placeholder">
        <Text variant="p" size="md" color="muted">
          Product management interface would go here. This would include:
        </Text>
        <ul className="store-detail-manage__feature-list">
          <li>Product listing with images and details</li>
          <li>Add/Edit/Delete products</li>
          <li>Product categories and pricing</li>
          <li>Inventory management</li>
          <li>Product status and availability</li>
        </ul>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="store-detail-manage__reviews">
      <div className="store-detail-manage__section-header">
        <Title level="h3" size="lg" color="primary">
          Customer Reviews
        </Title>
        <div className="store-detail-manage__review-stats">
          <Text variant="p" size="md" color="primary">
            Average Rating: {store.rating.toFixed(1)} ⭐
          </Text>
          <Text variant="p" size="sm" color="muted">
            Based on {store.reviewCount} reviews
          </Text>
        </div>
      </div>
      
      <div className="store-detail-manage__reviews-placeholder">
        <Text variant="p" size="md" color="muted">
          Review management interface would go here. This would include:
        </Text>
        <ul className="store-detail-manage__feature-list">
          <li>Review listing with customer details</li>
          <li>Review moderation tools</li>
          <li>Response to reviews</li>
          <li>Review analytics and insights</li>
        </ul>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="store-detail-manage__analytics">
      <Title level="h3" size="lg" color="primary">
        Store Analytics
      </Title>
      
      <div className="store-detail-manage__analytics-placeholder">
        <Text variant="p" size="md" color="muted">
          Analytics dashboard would go here. This would include:
        </Text>
        <ul className="store-detail-manage__feature-list">
          <li>Visitor statistics and trends</li>
          <li>Revenue and sales data</li>
          <li>Popular products and categories</li>
          <li>Customer demographics</li>
          <li>Performance metrics and KPIs</li>
        </ul>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="store-detail-manage__settings">
      <Title level="h3" size="lg" color="primary">
        Store Settings
      </Title>
      
      <div className="store-detail-manage__settings-placeholder">
        <Text variant="p" size="md" color="muted">
          Settings management would go here. This would include:
        </Text>
        <ul className="store-detail-manage__feature-list">
          <li>Store status and visibility settings</li>
          <li>Notification preferences</li>
          <li>Payment and billing settings</li>
          <li>Security and access controls</li>
          <li>Integration settings</li>
        </ul>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'details':
        return renderDetails();
      case 'products':
        return renderProducts();
      case 'reviews':
        return renderReviews();
      case 'analytics':
        return renderAnalytics();
      case 'settings':
        return renderSettings();
      default:
        return renderOverview();
    }
  };

  return (
    <div className={`store-detail-manage ${className}`}>
      <div className="store-detail-manage__header">
        <div className="store-detail-manage__header-left">
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/admin/stores')}
            className="store-detail-manage__back-btn"
          >
            ← Back to Stores
          </Button>
          <div className="store-detail-manage__title-section">
            <Title level="h1" size="xl" color="primary" className="store-detail-manage__title">
              {store.name}
            </Title>
            <Text variant="p" size="md" color="secondary" className="store-detail-manage__subtitle">
              {store.address}, {store.city}, {store.state} {store.zipCode}
            </Text>
          </div>
        </div>
        
        <div className="store-detail-manage__header-right">
          <div className="store-detail-manage__store-image">
            <img src={store.image} alt={store.name} className="store-detail-manage__image" />
          </div>
        </div>
      </div>

      <div className="store-detail-manage__tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`store-detail-manage__tab ${
              activeTab === tab.id ? 'store-detail-manage__tab--active' : ''
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="store-detail-manage__tab-icon">{tab.icon}</span>
            <Text variant="span" size="sm" color={activeTab === tab.id ? 'primary' : 'muted'}>
              {tab.label}
            </Text>
          </button>
        ))}
      </div>

      <div className="store-detail-manage__content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default StoreDetailManage;
