import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import './ReviewManage.css';

interface ReviewManageProps {
  className?: string;
}

interface ReviewItem {
  id: number;
  userReviewed: string;
  content: string;
  rating: number;
  status: 'published' | 'pending' | 'rejected' | 'hidden';
  createdAt: string;
  updatedAt: string;
  menuItem?: string;
  orderId?: string;
}

const reviewItems: ReviewItem[] = [
  {
    id: 1,
    userReviewed: 'John Smith',
    content: 'Great coffee and excellent service! The barista was very friendly and the latte was perfectly made. Will definitely come back again.',
    rating: 5,
    status: 'published',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    menuItem: 'Latte',
    orderId: '#12345'
  },
  {
    id: 2,
    userReviewed: 'Sarah Johnson',
    content: 'The croissant was fresh and delicious. However, the service was a bit slow during peak hours.',
    rating: 4,
    status: 'published',
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
    menuItem: 'Croissant',
    orderId: '#12346'
  },
  {
    id: 3,
    userReviewed: 'Mike Wilson',
    content: 'Disappointed with the quality. The coffee was cold and the pastry was stale. Not worth the price.',
    rating: 2,
    status: 'pending',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
    menuItem: 'Americano',
    orderId: '#12347'
  },
  {
    id: 4,
    userReviewed: 'Emily Davis',
    content: 'Amazing atmosphere and the staff is very welcoming. The cappuccino was perfect!',
    rating: 5,
    status: 'published',
    createdAt: '2024-01-12T14:20:00Z',
    updatedAt: '2024-01-12T14:20:00Z',
    menuItem: 'Cappuccino',
    orderId: '#12348'
  },
  {
    id: 5,
    userReviewed: 'David Brown',
    content: 'Good coffee but the place was too crowded and noisy. Hard to have a conversation.',
    rating: 3,
    status: 'published',
    createdAt: '2024-01-11T11:45:00Z',
    updatedAt: '2024-01-11T11:45:00Z',
    menuItem: 'Espresso',
    orderId: '#12349'
  },
  {
    id: 6,
    userReviewed: 'Lisa Anderson',
    content: 'Terrible experience. Rude staff and overpriced food. Would not recommend.',
    rating: 1,
    status: 'rejected',
    createdAt: '2024-01-10T16:30:00Z',
    updatedAt: '2024-01-10T16:30:00Z',
    menuItem: 'Sandwich',
    orderId: '#12350'
  },
  {
    id: 7,
    userReviewed: 'Tom Garcia',
    content: 'Decent coffee but nothing special. The place is clean and staff is okay.',
    rating: 3,
    status: 'hidden',
    createdAt: '2024-01-09T13:10:00Z',
    updatedAt: '2024-01-09T13:10:00Z',
    menuItem: 'Cold Brew',
    orderId: '#12351'
  },
  {
    id: 8,
    userReviewed: 'Anna Martinez',
    content: 'Love the new seasonal drinks! The pumpkin spice latte was amazing. Great customer service too.',
    rating: 5,
    status: 'published',
    createdAt: '2024-01-08T10:25:00Z',
    updatedAt: '2024-01-08T10:25:00Z',
    menuItem: 'Pumpkin Spice Latte',
    orderId: '#12352'
  }
];

const statusOptions = ['All', 'Published', 'Pending', 'Rejected', 'Hidden'];
const ratingOptions = ['All', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];

const ReviewManage: React.FC<ReviewManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');
  const [sortBy, setSortBy] = useState('createdAt-desc');
  
  // Filter and sort reviews
  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviewItems.filter(item => {
      const matchesSearch = item.userReviewed.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (item.menuItem && item.menuItem.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'All' || 
                           (statusFilter === 'Published' && item.status === 'published') ||
                           (statusFilter === 'Pending' && item.status === 'pending') ||
                           (statusFilter === 'Rejected' && item.status === 'rejected') ||
                           (statusFilter === 'Hidden' && item.status === 'hidden');
      const matchesRating = ratingFilter === 'All' || 
                           (ratingFilter === '5 Stars' && item.rating === 5) ||
                           (ratingFilter === '4 Stars' && item.rating === 4) ||
                           (ratingFilter === '3 Stars' && item.rating === 3) ||
                           (ratingFilter === '2 Stars' && item.rating === 2) ||
                           (ratingFilter === '1 Star' && item.rating === 1);
      
      return matchesSearch && matchesStatus && matchesRating;
    });

    // Sort reviews
    filtered.sort((a, b) => {
      const [sortKey, direction] = sortBy.split('-');
      const isAsc = direction === 'asc';
      
      let aValue: any = a[sortKey as keyof ReviewItem];
      let bValue: any = b[sortKey as keyof ReviewItem];
      
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
  }, [searchTerm, statusFilter, ratingFilter, sortBy]);

  // Statistics
  const statsData = [
    {
      title: 'Total Reviews',
      value: reviewItems.length.toString(),
      icon: '⭐',
      trend: { value: 3, isPositive: true }
    },
    {
      title: 'Published',
      value: reviewItems.filter(item => item.status === 'published').length.toString(),
      icon: '✅',
      trend: { value: 2, isPositive: true }
    },
    {
      title: 'Pending',
      value: reviewItems.filter(item => item.status === 'pending').length.toString(),
      icon: '⏳',
      trend: { value: 1, isPositive: true }
    },
    {
      title: 'Avg Rating',
      value: (reviewItems.reduce((sum, item) => sum + item.rating, 0) / reviewItems.length).toFixed(1),
      icon: '📊',
      trend: { value: 0.2, isPositive: true }
    }
  ];

  const handleViewReview = (review: ReviewItem) => {
    navigate(`/admin/store/review/${review.id}`);
  };

  const handleEditReview = (review: ReviewItem) => {
    navigate(`/admin/store/review/${review.id}/edit`);
  };

  const handleDeleteReview = (review: ReviewItem) => {
    if (window.confirm(`Are you sure you want to delete this review from ${review.userReviewed}?`)) {
      console.log('Delete review:', review.id);
      // In a real app, this would make an API call
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { label: 'Published', className: 'review-manage__status-badge--published' },
      pending: { label: 'Pending', className: 'review-manage__status-badge--pending' },
      rejected: { label: 'Rejected', className: 'review-manage__status-badge--rejected' },
      hidden: { label: 'Hidden', className: 'review-manage__status-badge--hidden' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`review-manage__status-badge ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="review-manage__stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`review-manage__star ${star <= rating ? 'review-manage__star--filled' : ''}`}
          >
            ★
          </span>
        ))}
        <Text variant="span" size="xs" color="muted" className="review-manage__rating-text">
          ({rating}/5)
        </Text>
      </div>
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
      key: 'userReviewed',
      label: 'User Reviewed',
      sortable: true,
      width: '150px',
      render: (value: string, item: ReviewItem) => (
        <div className="review-manage__user-info">
          <Text variant="p" size="sm" color="primary" className="review-manage__user-name">
            {value}
          </Text>
          {item.menuItem && (
            <Text variant="p" size="xs" color="muted" className="review-manage__menu-item">
              {item.menuItem}
            </Text>
          )}
        </div>
      )
    },
    {
      key: 'content',
      label: 'Content',
      width: '300px',
      render: (value: string) => (
        <Text variant="p" size="sm" color="secondary" className="review-manage__content">
          {value.length > 100 ? `${value.substring(0, 100)}...` : value}
        </Text>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      width: '120px',
      render: (value: number) => renderStars(value)
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px',
      render: (value: string) => getStatusBadge(value)
    },
    {
      key: 'createdAt',
      label: 'Date',
      sortable: true,
      width: '100px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="muted">
          {formatDate(value)}
        </Text>
      )
    }
  ];

  return (
    <div className={`review-manage ${className}`}>
      <div className="review-manage__header">
        <div className="review-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="review-manage__title">
            Review Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="review-manage__subtitle">
            Manage customer reviews and feedback
          </Text>
        </div>
        <div className="review-manage__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/store')}>
            Back
          </Button>
        </div>
      </div>

      <div className="review-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="review-manage__stat-card"
          />
        ))}
      </div>

      <div className="review-manage__filters">
        <div className="review-manage__filter-group">
          <Input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="review-manage__search-input"
          />
        </div>
        
        <div className="review-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="review-manage__filter-select"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="review-manage__filter-group">
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="review-manage__filter-select"
          >
            {ratingOptions.map(rating => (
              <option key={rating} value={rating}>
                {rating}
              </option>
            ))}
          </select>
        </div>

        <div className="review-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="review-manage__filter-select"
          >
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="rating-desc">Highest Rating</option>
            <option value="rating-asc">Lowest Rating</option>
            <option value="userReviewed-asc">User A-Z</option>
            <option value="userReviewed-desc">User Z-A</option>
          </select>
        </div>
      </div>

      <div className="review-manage__table-section">
        <AdminTable
          data={filteredAndSortedReviews}
          columns={tableColumns}
          onView={handleViewReview}
          onEdit={handleEditReview}
          onDelete={handleDeleteReview}
          emptyMessage="No reviews found matching your criteria"
        />
      </div>
    </div>
  );
};

export default ReviewManage;
