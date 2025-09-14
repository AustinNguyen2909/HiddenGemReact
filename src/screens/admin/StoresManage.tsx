import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminTable } from '../../components';
import { stores, storeStatuses, storeFilter, storeSortOptions, cityOptions, Store } from '../../dummyData';
import './StoresManage.css';

interface StoresManageProps {
  className?: string;
}

const StoresManage: React.FC<StoresManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter and sort stores
  const filteredAndSortedStores = useMemo(() => {
    let filtered = stores.filter(store => {
      const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           store.owner.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || 
                           (statusFilter === 'active' && store.isActive) ||
                           (statusFilter === 'inactive' && !store.isActive) ||
                           (statusFilter === 'pending' && !store.isActive);
      
      const matchesCity = cityFilter === 'all' || 
                         store.city.toLowerCase() === cityFilter.toLowerCase();
      
      return matchesSearch && matchesStatus && matchesCity;
    });

    // Sort stores
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating-desc':
          return b.rating - a.rating;
        case 'rating-asc':
          return a.rating - b.rating;
        case 'reviews-desc':
          return b.reviewCount - a.reviewCount;
        case 'reviews-asc':
          return a.reviewCount - b.reviewCount;
        case 'created-desc':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'created-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, statusFilter, cityFilter, sortBy]);

  const handleViewStore = (store: Store) => {
    navigate(`/admin/stores/${store.id}`);
  };

  const handleEditStore = (store: Store) => {
    navigate(`/admin/stores/${store.id}/edit`);
  };

  const handleDeleteStore = (store: Store) => {
    if (window.confirm(`Are you sure you want to delete "${store.name}"?`)) {
      // In a real app, this would make an API call
      console.log('Delete store:', store.id);
    }
  };

  const handleAddStore = () => {
    setShowAddModal(true);
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    // This would be handled by the table component
    console.log('Sort by:', key, direction);
  };

  const tableColumns = [
    {
      key: 'image',
      label: 'Image',
      width: '80px'
    },
    {
      key: 'name',
      label: 'Store Name',
      sortable: true,
      width: '200px',
      render: (value: string, item: Store) => (
        <div className="stores-manage__store-info">
          <Text variant="p" size="sm" color="primary" className="stores-manage__store-name">
            {value}
          </Text>
          <Text variant="p" size="xs" color="muted" className="stores-manage__store-owner">
            Owner: {item.owner}
          </Text>
        </div>
      )
    },
    {
      key: 'address',
      label: 'Location',
      width: '250px',
      render: (value: string, item: Store) => (
        <div className="stores-manage__location">
          <Text variant="p" size="sm" color="primary" className="stores-manage__address">
            {value}
          </Text>
          <Text variant="p" size="xs" color="muted" className="stores-manage__city">
            {item.city}, {item.state} {item.zipCode}
          </Text>
        </div>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      width: '120px'
    },
    {
      key: 'reviewCount',
      label: 'Reviews',
      sortable: true,
      width: '100px',
      render: (value: number) => (
        <Text variant="span" size="sm" color="primary">
          {value}
        </Text>
      )
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px'
    },
    {
      key: 'createdAt',
      label: 'Created',
      sortable: true,
      width: '120px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="muted">
          {new Date(value).toLocaleDateString()}
        </Text>
      )
    }
  ];

  return (
    <div className={`stores-manage ${className}`}>
      <div className="stores-manage__header">
        <div className="stores-manage__title-section">
          <Title level="h1" size="xl" color="primary" className="stores-manage__title">
            Store Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="stores-manage__subtitle">
            Manage all coffee shops in your platform
          </Text>
        </div>
        
        <div className="stores-manage__actions">
          <Button
            variant="primary"
            size="md"
            onClick={handleAddStore}
            className="stores-manage__add-btn"
          >
            + Add New Store
          </Button>
        </div>
      </div>

      <div className="stores-manage__filters">
        <div className="stores-manage__filter-group">
          <Input
            type="text"
            placeholder={storeFilter.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="stores-manage__search-input"
          />
        </div>

        <div className="stores-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="stores-manage__filter-select"
          >
            {storeStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="stores-manage__filter-group">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="stores-manage__filter-select"
          >
            {cityOptions.map((city) => (
              <option key={city.value} value={city.value}>
                {city.label}
              </option>
            ))}
          </select>
        </div>

        <div className="stores-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="stores-manage__filter-select"
          >
            {storeSortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="stores-manage__stats">
        <div className="stores-manage__stat">
          <Text variant="p" size="sm" color="muted" className="stores-manage__stat-label">
            Total Stores
          </Text>
          <Text variant="p" size="lg" color="primary" className="stores-manage__stat-value">
            {filteredAndSortedStores.length}
          </Text>
        </div>
        <div className="stores-manage__stat">
          <Text variant="p" size="sm" color="muted" className="stores-manage__stat-label">
            Active Stores
          </Text>
          <Text variant="p" size="lg" color="primary" className="stores-manage__stat-value">
            {filteredAndSortedStores.filter(store => store.isActive).length}
          </Text>
        </div>
        <div className="stores-manage__stat">
          <Text variant="p" size="sm" color="muted" className="stores-manage__stat-label">
            Open Now
          </Text>
          <Text variant="p" size="lg" color="primary" className="stores-manage__stat-value">
            {filteredAndSortedStores.filter(store => store.isOpen).length}
          </Text>
        </div>
      </div>

      <div className="stores-manage__table">
        <AdminTable
          columns={tableColumns}
          data={filteredAndSortedStores}
          onSort={handleSort}
          onView={handleViewStore}
          onEdit={handleEditStore}
          onDelete={handleDeleteStore}
          emptyMessage="No stores found matching your criteria"
        />
      </div>

      {showAddModal && (
        <div className="stores-manage__modal-overlay">
          <div className="stores-manage__modal">
            <div className="stores-manage__modal-header">
              <Title level="h2" size="lg" color="primary">
                Add New Store
              </Title>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddModal(false)}
                className="stores-manage__modal-close"
              >
                ✕
              </Button>
            </div>
            <div className="stores-manage__modal-content">
              <Text variant="p" size="md" color="secondary">
                Store creation form would go here. This is a placeholder for the add store functionality.
              </Text>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoresManage;
