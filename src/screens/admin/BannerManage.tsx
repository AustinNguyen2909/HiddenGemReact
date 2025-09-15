import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import { banners, bannerStatuses, bannerPositions, bannerSortOptions, bannerFilterConfig, Banner, BannerStatus, BannerPosition } from '../../dummyData';
import './BannerManage.css';

interface BannerManageProps {
  className?: string;
}

const BannerManage: React.FC<BannerManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BannerStatus | 'all'>('all');
  const [positionFilter, setPositionFilter] = useState<BannerPosition | 'all'>('all');
  const [sortBy, setSortBy] = useState('priority-asc');
  
  // Filter and sort banners
  const filteredAndSortedBanners = useMemo(() => {
    let filtered = banners.filter(banner => {
      const matchesSearch = banner.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           banner.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || banner.status === statusFilter;
      const matchesPosition = positionFilter === 'all' || banner.position === positionFilter;
      
      return matchesSearch && matchesStatus && matchesPosition;
    });

    // Sort banners
    filtered.sort((a, b) => {
      const [sortKey, direction] = sortBy.split('-');
      const isAsc = direction === 'asc';
      
      let aValue: any = a[sortKey as keyof Banner];
      let bValue: any = b[sortKey as keyof Banner];
      
      if (sortKey === 'createdAt' || sortKey === 'startDate' || sortKey === 'endDate') {
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
  }, [searchTerm, statusFilter, positionFilter, sortBy]);

  // Statistics
  const statsData = [
    {
      title: 'Total Banners',
      value: banners.length.toString(),
      icon: '📢',
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Active',
      value: banners.filter(banner => banner.status === 'active').length.toString(),
      icon: '✅',
      trend: { value: 5, isPositive: true }
    },
    {
      title: 'Total Clicks',
      value: banners.reduce((sum, banner) => sum + banner.clicks, 0).toLocaleString(),
      icon: '👆',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Total Impressions',
      value: banners.reduce((sum, banner) => sum + banner.impressions, 0).toLocaleString(),
      icon: '👀',
      trend: { value: 15, isPositive: true }
    }
  ];

  const handleViewBanner = (banner: Banner) => {
    navigate(`/admin/banners/${banner.id}`);
  };

  const handleEditBanner = (banner: Banner) => {
    navigate(`/admin/banners/${banner.id}/edit`);
  };

  const handleDeleteBanner = (banner: Banner) => {
    if (window.confirm(`Are you sure you want to delete "${banner.title}"?`)) {
      console.log('Delete banner:', banner.id);
      // In a real app, this would make an API call
    }
  };

  const handleAddBanner = () => {
    navigate('/admin/banners/new');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = bannerStatuses.find(s => s.id === status);
    return (
      <span className={`banner-manage__status-badge banner-manage__status-badge--${statusConfig?.color || 'muted'}`}>
        {statusConfig?.label || status}
      </span>
    );
  };

  const getPositionBadge = (position: string) => {
    const positionConfig = bannerPositions.find(p => p.id === position);
    return (
      <span className="banner-manage__position-badge">
        {positionConfig?.label || position}
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
      key: 'image',
      label: 'Image',
      width: '100px',
      render: (value: string, item: Banner) => (
        <div className="banner-manage__image">
          <img src={item.image} alt={item.title} className="banner-manage__image-img" />
        </div>
      )
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      width: '250px',
      render: (value: string, item: Banner) => (
        <div className="banner-manage__banner-info">
          <Text variant="p" size="sm" color="primary" className="banner-manage__banner-title">
            {item.title}
          </Text>
          <Text variant="p" size="xs" color="muted" className="banner-manage__banner-description">
            {item.description}
          </Text>
          <div className="banner-manage__banner-meta">
            <Text variant="span" size="xs" color="muted">
              Priority: {item.priority} • {getPositionBadge(item.position)}
            </Text>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      width: '100px',
      render: (value: string) => getStatusBadge(value)
    },
    {
      key: 'clicks',
      label: 'Clicks',
      sortable: true,
      width: '80px',
      render: (value: number) => (
        <Text variant="span" size="sm" color="primary">
          {value.toLocaleString()}
        </Text>
      )
    },
    {
      key: 'impressions',
      label: 'Impressions',
      sortable: true,
      width: '100px',
      render: (value: number) => (
        <Text variant="span" size="sm" color="muted">
          {value.toLocaleString()}
        </Text>
      )
    },
    {
      key: 'startDate',
      label: 'Start Date',
      sortable: true,
      width: '120px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="muted">
          {formatDate(value)}
        </Text>
      )
    },
    {
      key: 'endDate',
      label: 'End Date',
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
    <div className={`banner-manage ${className}`}>
      <div className="banner-manage__header">
        <div className="banner-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="banner-manage__title">
            Banner Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="banner-manage__subtitle">
            Manage promotional banners and advertisements
          </Text>
        </div>
        <div className="banner-manage__header-right">
          <Button
            variant="primary"
            size="md"
            onClick={handleAddBanner}
            className="banner-manage__add-btn"
          >
            + New Banner
          </Button>
        </div>
      </div>

      <div className="banner-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="banner-manage__stat-card"
          />
        ))}
      </div>

      <div className="banner-manage__filters">
        <div className="banner-manage__filter-group">
          <Input
            type="text"
            placeholder={bannerFilterConfig.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="banner-manage__search-input"
          />
        </div>
        
        <div className="banner-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as BannerStatus | 'all')}
            className="banner-manage__filter-select"
          >
            <option value="all">All Status</option>
            {bannerStatuses.map(status => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="banner-manage__filter-group">
          <select
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value as BannerPosition | 'all')}
            className="banner-manage__filter-select"
          >
            <option value="all">All Positions</option>
            {bannerPositions.map(position => (
              <option key={position.id} value={position.id}>
                {position.label}
              </option>
            ))}
          </select>
        </div>

        <div className="banner-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="banner-manage__filter-select"
          >
            {bannerSortOptions.map(option => (
              <option key={`${option.id}-asc`} value={`${option.id}-asc`}>
                {option.label} (A-Z)
              </option>
            ))}
            {bannerSortOptions.map(option => (
              <option key={`${option.id}-desc`} value={`${option.id}-desc`}>
                {option.label} (Z-A)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="banner-manage__table-section">
        <AdminTable
          data={filteredAndSortedBanners}
          columns={tableColumns}
          onView={handleViewBanner}
          onEdit={handleEditBanner}
          onDelete={handleDeleteBanner}
          emptyMessage="No banners found matching your criteria"
        />
      </div>
    </div>
  );
};

export default BannerManage;
