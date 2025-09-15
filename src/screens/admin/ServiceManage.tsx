import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import './ServiceManage.css';

interface ServiceManageProps {
  className?: string;
}

interface ServiceItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  duration: string;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

const serviceItems: ServiceItem[] = [
  {
    id: 1,
    name: 'Espresso',
    description: 'Single or double shot espresso',
    category: 'Coffee',
    price: '$2.50',
    duration: '2 min',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Latte',
    description: 'Espresso with steamed milk',
    category: 'Coffee',
    price: '$4.00',
    duration: '3 min',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 3,
    name: 'Cappuccino',
    description: 'Espresso with equal parts steamed milk and foam',
    category: 'Coffee',
    price: '$3.50',
    duration: '3 min',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 4,
    name: 'Americano',
    description: 'Espresso with hot water',
    category: 'Coffee',
    price: '$2.75',
    duration: '2 min',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 5,
    name: 'Cold Brew',
    description: 'Slow-steeped cold coffee',
    category: 'Coffee',
    price: '$3.25',
    duration: '1 min',
    isAvailable: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 6,
    name: 'Croissant',
    description: 'Fresh baked buttery croissant',
    category: 'Pastry',
    price: '$3.50',
    duration: '1 min',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 7,
    name: 'Muffin',
    description: 'Blueberry or chocolate chip muffin',
    category: 'Pastry',
    price: '$2.75',
    duration: '1 min',
    isAvailable: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 8,
    name: 'Sandwich',
    description: 'Grilled chicken or turkey sandwich',
    category: 'Food',
    price: '$8.50',
    duration: '5 min',
    isAvailable: false,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  }
];

const categories = ['All', 'Coffee', 'Pastry', 'Food'];
const statusOptions = ['All', 'Available', 'Unavailable'];

const ServiceManage: React.FC<ServiceManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('name-asc');
  
  // Filter and sort services
  const filteredAndSortedServices = useMemo(() => {
    let filtered = serviceItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      const matchesStatus = statusFilter === 'All' || 
                           (statusFilter === 'Available' && item.isAvailable) ||
                           (statusFilter === 'Unavailable' && !item.isAvailable);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort services
    filtered.sort((a, b) => {
      const [sortKey, direction] = sortBy.split('-');
      const isAsc = direction === 'asc';
      
      let aValue: any = a[sortKey as keyof ServiceItem];
      let bValue: any = b[sortKey as keyof ServiceItem];
      
      if (sortKey === 'createdAt' || sortKey === 'updatedAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (isAsc) {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, categoryFilter, statusFilter, sortBy]);

  // Statistics
  const statsData = [
    {
      title: 'Total Services',
      value: serviceItems.length.toString(),
      icon: '☕',
      trend: { value: 2, isPositive: true }
    },
    {
      title: 'Available',
      value: serviceItems.filter(item => item.isAvailable).length.toString(),
      icon: '✅',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Coffee Items',
      value: serviceItems.filter(item => item.category === 'Coffee').length.toString(),
      icon: '☕',
      trend: { value: 0, isPositive: true }
    },
    {
      title: 'Food Items',
      value: serviceItems.filter(item => item.category === 'Food').length.toString(),
      icon: '🍽️',
      trend: { value: 1, isPositive: true }
    }
  ];

  const handleViewService = (service: ServiceItem) => {
    navigate(`/admin/introductions/service/${service.id}`);
  };

  const handleEditService = (service: ServiceItem) => {
    navigate(`/admin/introductions/service/${service.id}/edit`);
  };

  const handleDeleteService = (service: ServiceItem) => {
    if (window.confirm(`Are you sure you want to delete "${service.name}"?`)) {
      console.log('Delete service:', service.id);
      // In a real app, this would make an API call
    }
  };

  const handleAddService = () => {
    navigate('/admin/introductions/service/new');
  };

  const getStatusBadge = (isAvailable: boolean) => {
    return (
      <span className={`service-manage__status-badge ${isAvailable ? 'service-manage__status-badge--available' : 'service-manage__status-badge--unavailable'}`}>
        {isAvailable ? 'Available' : 'Unavailable'}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const tableColumns = [
    {
      key: 'name',
      label: 'Service Name',
      sortable: true,
      width: '200px',
      render: (value: string, item: ServiceItem) => (
        <div className="service-manage__service-info">
          <Text variant="p" size="sm" color="primary" className="service-manage__service-name">
            {value}
          </Text>
          <Text variant="p" size="xs" color="muted" className="service-manage__service-description">
            {item.description}
          </Text>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      width: '100px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="secondary">
          {value}
        </Text>
      )
    },
    {
      key: 'price',
      label: 'Price',
      sortable: true,
      width: '80px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="primary" className="service-manage__price">
          {value}
        </Text>
      )
    },
    {
      key: 'duration',
      label: 'Duration',
      width: '80px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="muted">
          {value}
        </Text>
      )
    },
    {
      key: 'isAvailable',
      label: 'Status',
      width: '100px',
      render: (value: boolean) => getStatusBadge(value)
    },
    {
      key: 'updatedAt',
      label: 'Updated',
      sortable: true,
      width: '120px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="muted">
          {formatDate(value)}
        </Text>
      )
    }
  ];

  return (
    <div className={`service-manage ${className}`}>
      <div className="service-manage__header">
        <div className="service-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="service-manage__title">
            Service Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="service-manage__subtitle">
            Manage your coffee shop services and offerings
          </Text>
        </div>
        <div className="service-manage__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/introductions')}>
            Back
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleAddService}
            className="service-manage__add-btn"
          >
            + Add Service
          </Button>
        </div>
      </div>

      <div className="service-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="service-manage__stat-card"
          />
        ))}
      </div>

      <div className="service-manage__filters">
        <div className="service-manage__filter-group">
          <Input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="service-manage__search-input"
          />
        </div>
        
        <div className="service-manage__filter-group">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="service-manage__filter-select"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="service-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="service-manage__filter-select"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="service-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="service-manage__filter-select"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price Low-High</option>
            <option value="price-desc">Price High-Low</option>
            <option value="category-asc">Category A-Z</option>
            <option value="category-desc">Category Z-A</option>
            <option value="updatedAt-desc">Recently Updated</option>
            <option value="updatedAt-asc">Oldest Updated</option>
          </select>
        </div>
      </div>

      <div className="service-manage__table-section">
        <AdminTable
          data={filteredAndSortedServices}
          columns={tableColumns}
          onView={handleViewService}
          onEdit={handleEditService}
          onDelete={handleDeleteService}
          emptyMessage="No services found matching your criteria"
        />
      </div>
    </div>
  );
};

export default ServiceManage;
