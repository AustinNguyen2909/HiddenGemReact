import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import './PromotionManage.css';

interface PromotionManageProps {
  className?: string;
}

interface PromotionItem {
  id: number;
  promotionName: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'draft' | 'expired';
  discountType: 'percentage' | 'fixed' | 'buy_x_get_y';
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usedCount: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

const promotionItems: PromotionItem[] = [
  {
    id: 1,
    promotionName: 'Summer Coffee Special',
    description: 'Get 20% off on all iced coffee drinks during summer months',
    startDate: '2024-06-01T00:00:00Z',
    endDate: '2024-08-31T23:59:59Z',
    status: 'active',
    discountType: 'percentage',
    discountValue: 20,
    minOrderAmount: 10,
    maxDiscountAmount: 50,
    usageLimit: 100,
    usedCount: 45,
    image: '/images/promotions/summer-coffee.jpg',
    createdAt: '2024-05-15T10:00:00Z',
    updatedAt: '2024-05-15T10:00:00Z'
  },
  {
    id: 2,
    promotionName: 'Buy 2 Get 1 Free Pastries',
    description: 'Purchase any 2 pastries and get the third one free',
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    status: 'active',
    discountType: 'buy_x_get_y',
    discountValue: 1,
    minOrderAmount: 15,
    usageLimit: 200,
    usedCount: 78,
    image: '/images/promotions/pastry-deal.jpg',
    createdAt: '2023-12-20T14:30:00Z',
    updatedAt: '2024-01-15T09:15:00Z'
  },
  {
    id: 3,
    promotionName: 'Happy Hour Discount',
    description: '50% off all drinks from 2 PM to 4 PM on weekdays',
    startDate: '2024-01-15T00:00:00Z',
    endDate: '2024-03-15T23:59:59Z',
    status: 'expired',
    discountType: 'percentage',
    discountValue: 50,
    usageLimit: 50,
    usedCount: 50,
    image: '/images/promotions/happy-hour.jpg',
    createdAt: '2024-01-10T11:20:00Z',
    updatedAt: '2024-03-15T23:59:59Z'
  },
  {
    id: 4,
    promotionName: 'Student Discount',
    description: '15% off for students with valid ID',
    startDate: '2024-09-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    status: 'draft',
    discountType: 'percentage',
    discountValue: 15,
    minOrderAmount: 5,
    usageLimit: 500,
    usedCount: 0,
    image: '/images/promotions/student-discount.jpg',
    createdAt: '2024-08-25T16:45:00Z',
    updatedAt: '2024-08-25T16:45:00Z'
  },
  {
    id: 5,
    promotionName: 'Free Delivery Weekend',
    description: 'Free delivery on orders over $25 during weekends',
    startDate: '2024-02-01T00:00:00Z',
    endDate: '2024-02-29T23:59:59Z',
    status: 'inactive',
    discountType: 'fixed',
    discountValue: 5,
    minOrderAmount: 25,
    usageLimit: 100,
    usedCount: 23,
    image: '/images/promotions/free-delivery.jpg',
    createdAt: '2024-01-28T13:10:00Z',
    updatedAt: '2024-02-15T10:30:00Z'
  },
  {
    id: 6,
    promotionName: 'New Customer Welcome',
    description: 'First-time customers get $5 off their first order',
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    status: 'active',
    discountType: 'fixed',
    discountValue: 5,
    minOrderAmount: 15,
    usageLimit: 1000,
    usedCount: 234,
    image: '/images/promotions/welcome-offer.jpg',
    createdAt: '2023-12-15T09:00:00Z',
    updatedAt: '2024-01-20T14:22:00Z'
  }
];

const statusOptions = ['All', 'Active', 'Inactive', 'Draft', 'Expired'];
const discountTypeOptions = ['All', 'Percentage', 'Fixed Amount', 'Buy X Get Y'];

const PromotionManage: React.FC<PromotionManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [discountTypeFilter, setDiscountTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt-desc');
  
  // Filter and sort promotions
  const filteredAndSortedPromotions = useMemo(() => {
    let filtered = promotionItems.filter(item => {
      const matchesSearch = item.promotionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || 
                           (statusFilter === 'Active' && item.status === 'active') ||
                           (statusFilter === 'Inactive' && item.status === 'inactive') ||
                           (statusFilter === 'Draft' && item.status === 'draft') ||
                           (statusFilter === 'Expired' && item.status === 'expired');
      const matchesDiscountType = discountTypeFilter === 'All' || 
                                 (discountTypeFilter === 'Percentage' && item.discountType === 'percentage') ||
                                 (discountTypeFilter === 'Fixed Amount' && item.discountType === 'fixed') ||
                                 (discountTypeFilter === 'Buy X Get Y' && item.discountType === 'buy_x_get_y');
      
      return matchesSearch && matchesStatus && matchesDiscountType;
    });

    // Sort promotions
    filtered.sort((a, b) => {
      const [sortKey, direction] = sortBy.split('-');
      const isAsc = direction === 'asc';
      
      let aValue: any = a[sortKey as keyof PromotionItem];
      let bValue: any = b[sortKey as keyof PromotionItem];
      
      if (sortKey === 'createdAt' || sortKey === 'updatedAt' || sortKey === 'startDate' || sortKey === 'endDate') {
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
  }, [searchTerm, statusFilter, discountTypeFilter, sortBy]);

  // Statistics
  const statsData = [
    {
      title: 'Total Promotions',
      value: promotionItems.length.toString(),
      icon: '🎯',
      trend: { value: 2, isPositive: true }
    },
    {
      title: 'Active',
      value: promotionItems.filter(item => item.status === 'active').length.toString(),
      icon: '✅',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Total Usage',
      value: promotionItems.reduce((sum, item) => sum + item.usedCount, 0).toString(),
      icon: '📈',
      trend: { value: 15, isPositive: true }
    },
    {
      title: 'Draft',
      value: promotionItems.filter(item => item.status === 'draft').length.toString(),
      icon: '📝',
      trend: { value: 0, isPositive: false }
    }
  ];

  const handleViewPromotion = (promotion: PromotionItem) => {
    navigate(`/admin/store/promotion/${promotion.id}`);
  };

  const handleEditPromotion = (promotion: PromotionItem) => {
    navigate(`/admin/store/promotion/${promotion.id}/edit`);
  };

  const handleDeletePromotion = (promotion: PromotionItem) => {
    if (window.confirm(`Are you sure you want to delete the promotion "${promotion.promotionName}"?`)) {
      console.log('Delete promotion:', promotion.id);
      // In a real app, this would make an API call
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', className: 'promotion-manage__status-badge--active' },
      inactive: { label: 'Inactive', className: 'promotion-manage__status-badge--inactive' },
      draft: { label: 'Draft', className: 'promotion-manage__status-badge--draft' },
      expired: { label: 'Expired', className: 'promotion-manage__status-badge--expired' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft;
    
    return (
      <span className={`promotion-manage__status-badge ${config.className}`}>
        {config.label}
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

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return `${start} - ${end}`;
  };

  const getDiscountDisplay = (promotion: PromotionItem) => {
    switch (promotion.discountType) {
      case 'percentage':
        return `${promotion.discountValue}% off`;
      case 'fixed':
        return `$${promotion.discountValue} off`;
      case 'buy_x_get_y':
        return `Buy 2 Get ${promotion.discountValue} Free`;
      default:
        return 'N/A';
    }
  };

  const tableColumns = [
    {
      key: 'promotionName',
      label: 'Promotion Name',
      sortable: true,
      width: '200px',
      render: (value: string, item: PromotionItem) => (
        <div className="promotion-manage__promotion-info">
          <Text variant="p" size="sm" color="primary" className="promotion-manage__promotion-name">
            {value}
          </Text>
          <Text variant="p" size="xs" color="muted" className="promotion-manage__discount-value">
            {getDiscountDisplay(item)}
          </Text>
        </div>
      )
    },
    {
      key: 'description',
      label: 'Description',
      width: '250px',
      render: (value: string) => (
        <Text variant="p" size="sm" color="secondary" className="promotion-manage__description">
          {value.length > 80 ? `${value.substring(0, 80)}...` : value}
        </Text>
      )
    },
    {
      key: 'startDate',
      label: 'Time Period',
      sortable: true,
      width: '180px',
      render: (value: string, item: PromotionItem) => (
        <div className="promotion-manage__time-info">
          <Text variant="p" size="sm" color="primary" className="promotion-manage__time-range">
            {formatDateRange(item.startDate, item.endDate)}
          </Text>
          <Text variant="p" size="xs" color="muted" className="promotion-manage__time-days">
            {Math.ceil((new Date(item.endDate).getTime() - new Date(item.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
          </Text>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px',
      render: (value: string) => getStatusBadge(value)
    },
    {
      key: 'usedCount',
      label: 'Usage',
      sortable: true,
      width: '100px',
      render: (value: number, item: PromotionItem) => (
        <div className="promotion-manage__usage-info">
          <Text variant="span" size="sm" color="primary" className="promotion-manage__usage-count">
            {value}
          </Text>
          {item.usageLimit && (
            <Text variant="span" size="xs" color="muted" className="promotion-manage__usage-limit">
              /{item.usageLimit}
            </Text>
          )}
        </div>
      )
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
    <div className={`promotion-manage ${className}`}>
      <div className="promotion-manage__header">
        <div className="promotion-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="promotion-manage__title">
            Promotion Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="promotion-manage__subtitle">
            Manage promotional campaigns and discounts
          </Text>
        </div>
        <div className="promotion-manage__header-right">
          <Button variant="primary" size="md" onClick={() => navigate('/admin/store/promotion/new')}>
            Add New Promotion
          </Button>
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/store')}>
            Back
          </Button>
        </div>
      </div>

      <div className="promotion-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="promotion-manage__stat-card"
          />
        ))}
      </div>

      <div className="promotion-manage__filters">
        <div className="promotion-manage__filter-group">
          <Input
            type="text"
            placeholder="Search promotions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="promotion-manage__search-input"
          />
        </div>
        
        <div className="promotion-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="promotion-manage__filter-select"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="promotion-manage__filter-group">
          <select
            value={discountTypeFilter}
            onChange={(e) => setDiscountTypeFilter(e.target.value)}
            className="promotion-manage__filter-select"
          >
            {discountTypeOptions.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="promotion-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="promotion-manage__filter-select"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="promotionName-asc">Name A-Z</option>
            <option value="promotionName-desc">Name Z-A</option>
            <option value="startDate-asc">Start Date (Earliest)</option>
            <option value="startDate-desc">Start Date (Latest)</option>
            <option value="usedCount-desc">Most Used</option>
            <option value="usedCount-asc">Least Used</option>
          </select>
        </div>
      </div>

      <div className="promotion-manage__table-section">
        <AdminTable
          data={filteredAndSortedPromotions}
          columns={tableColumns}
          onView={handleViewPromotion}
          onEdit={handleEditPromotion}
          onDelete={handleDeletePromotion}
          emptyMessage="No promotions found matching your criteria"
        />
      </div>
    </div>
  );
};

export default PromotionManage;
