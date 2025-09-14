import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminStatsCard, AdminTable } from '../../components';
import { blogs, blogStatuses, adminBlogCategories, blogAuthors, blogSortOptions, Blog, BlogStatus } from '../../dummyData';
import './BlogsManage.css';

interface BlogsManageProps {
  className?: string;
}

const BlogsManage: React.FC<BlogsManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<BlogStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [authorFilter, setAuthorFilter] = useState('all');
  
  // Sort states
  const [sortColumn, setSortColumn] = useState<string>('publishedAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Filter and sort blogs
  const filteredAndSortedBlogs = useMemo(() => {
    let filtered = blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           blog.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
      const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter;
      const matchesAuthor = authorFilter === 'all' || blog.author === authorFilter;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesAuthor;
    });

    // Sort blogs
    filtered.sort((a, b) => {
      let aValue: any = a[sortColumn as keyof Blog];
      let bValue: any = b[sortColumn as keyof Blog];
      
      if (sortColumn === 'publishedAt' || sortColumn === 'updatedAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, statusFilter, categoryFilter, authorFilter, sortColumn, sortDirection]);

  // Statistics
  const statsData = [
    {
      title: 'Total Blogs',
      value: blogs.length.toString(),
      icon: '📝',
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Published',
      value: blogs.filter(blog => blog.status === 'published').length.toString(),
      icon: '✅',
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Drafts',
      value: blogs.filter(blog => blog.status === 'draft').length.toString(),
      icon: '📄',
      trend: { value: 3, isPositive: false }
    },
    {
      title: 'Total Views',
      value: blogs.reduce((sum, blog) => sum + blog.views, 0).toLocaleString(),
      icon: '👀',
      trend: { value: 15, isPositive: true }
    }
  ];

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleViewBlog = (blog: Blog) => {
    navigate(`/admin/blogs/${blog.id}`);
  };

  const handleEditBlog = (blog: Blog) => {
    navigate(`/admin/blogs/${blog.id}/edit`);
  };

  const handleDeleteBlog = (blog: Blog) => {
    if (window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      console.log('Delete blog:', blog.id);
      // In a real app, this would make an API call
    }
  };

  const handleAddBlog = () => {
    navigate('/admin/blogs/new');
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = blogStatuses.find(s => s.id === status);
    return (
      <span className={`blogs-manage__status-badge blogs-manage__status-badge--${status}`}>
        {statusConfig?.label || status}
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
      key: 'featuredImage',
      label: 'Image',
      width: '80px',
      render: (value: string, item: Blog) => (
        <div className="blogs-manage__image">
          <img src={item.featuredImage} alt={item.title} className="blogs-manage__image-img" />
        </div>
      )
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true,
      width: '300px',
      render: (value: string, item: Blog) => (
        <div className="blogs-manage__blog-info">
          <Text variant="p" size="sm" color="primary" className="blogs-manage__blog-title">
            {item.title}
          </Text>
          <Text variant="p" size="xs" color="muted" className="blogs-manage__blog-excerpt">
            {item.excerpt}
          </Text>
          <div className="blogs-manage__blog-meta">
            <Text variant="span" size="xs" color="muted">
              by {item.author} • {item.readingTime} min read
            </Text>
          </div>
        </div>
      )
    },
    {
      key: 'category',
      label: 'Category',
      width: '120px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="secondary">
          {value}
        </Text>
      )
    },
    {
      key: 'status',
      label: 'Status',
      width: '100px',
      render: (value: string) => getStatusBadge(value)
    },
    {
      key: 'publishedAt',
      label: 'Published',
      sortable: true,
      width: '100px',
      render: (value: string, item: Blog) => (
        <Text variant="span" size="sm" color="muted">
          {item.status === 'published' ? formatDate(value) : '-'}
        </Text>
      )
    },
    {
      key: 'views',
      label: 'Views',
      sortable: true,
      width: '80px',
      render: (value: number) => (
        <Text variant="span" size="sm" color="muted">
          {value.toLocaleString()}
        </Text>
      )
    }
  ];

  return (
    <div className={`blogs-manage ${className}`}>
      <div className="blogs-manage__header">
        <div className="blogs-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="blogs-manage__title">
            Blog Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="blogs-manage__subtitle">
            Manage your blog posts, drafts, and content strategy
          </Text>
        </div>
        <div className="blogs-manage__header-right">
          <Button
            variant="primary"
            size="md"
            onClick={handleAddBlog}
            className="blogs-manage__add-btn"
          >
            + New Blog Post
          </Button>
        </div>
      </div>

      <div className="blogs-manage__stats">
        {statsData.map((stat, index) => (
          <AdminStatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="blogs-manage__stat-card"
          />
        ))}
      </div>

      <div className="blogs-manage__filters">
        <div className="blogs-manage__filter-group">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="blogs-manage__search-input"
          />
        </div>
        
        <div className="blogs-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as BlogStatus | 'all')}
            className="blogs-manage__filter-select"
          >
            <option value="all">All Status</option>
            {blogStatuses.map(status => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="blogs-manage__filter-group">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="blogs-manage__filter-select"
          >
            <option value="all">All Categories</option>
            {adminBlogCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="blogs-manage__filter-group">
          <select
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
            className="blogs-manage__filter-select"
          >
            <option value="all">All Authors</option>
            {blogAuthors.map(author => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        <div className="blogs-manage__filter-group">
          <select
            value={`${sortColumn}-${sortDirection}`}
            onChange={(e) => {
              const [column, direction] = e.target.value.split('-');
              setSortColumn(column);
              setSortDirection(direction as 'asc' | 'desc');
            }}
            className="blogs-manage__filter-select"
          >
            {blogSortOptions.map(option => (
              <option key={`${option.id}-asc`} value={`${option.id}-asc`}>
                {option.label} (A-Z)
              </option>
            ))}
            {blogSortOptions.map(option => (
              <option key={`${option.id}-desc`} value={`${option.id}-desc`}>
                {option.label} (Z-A)
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="blogs-manage__table-section">
        <AdminTable
          data={filteredAndSortedBlogs}
          columns={tableColumns}
          onView={handleViewBlog}
          onEdit={handleEditBlog}
          onDelete={handleDeleteBlog}
          onSort={handleSort}
        />
      </div>

      {/* Placeholder modals - would be implemented in a real app */}
      <div className="blogs-manage__modals">
        {/* Add/Edit Blog Modal would go here */}
        {/* Delete Confirmation Modal would go here */}
      </div>
    </div>
  );
};

export default BlogsManage;
