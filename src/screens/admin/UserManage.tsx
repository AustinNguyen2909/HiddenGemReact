import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminTable } from '../../components';
import { users, userStatuses, userRoles, userFilter, userSortOptions, locationOptions, User } from '../../dummyData';
import './UserManage.css';

interface UserManageProps {
  className?: string;
}

const UserManage: React.FC<UserManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [showAddModal, setShowAddModal] = useState(false);

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.location.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesLocation = locationFilter === 'all' || 
                             user.location.city.toLowerCase() === locationFilter.toLowerCase();
      
      return matchesSearch && matchesStatus && matchesRole && matchesLocation;
    });

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
        case 'name-desc':
          return `${b.firstName} ${b.lastName}`.localeCompare(`${a.firstName} ${a.lastName}`);
        case 'email-asc':
          return a.email.localeCompare(b.email);
        case 'email-desc':
          return b.email.localeCompare(a.email);
        case 'join-desc':
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        case 'join-asc':
          return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
        case 'orders-desc':
          return b.totalOrders - a.totalOrders;
        case 'orders-asc':
          return a.totalOrders - b.totalOrders;
        case 'spent-desc':
          return b.totalSpent - a.totalSpent;
        case 'spent-asc':
          return a.totalSpent - b.totalSpent;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, statusFilter, roleFilter, locationFilter, sortBy]);

  const handleViewUser = (user: User) => {
    navigate(`/admin/users/${user.id}`);
  };

  const handleEditUser = (user: User) => {
    navigate(`/admin/users/${user.id}/edit`);
  };

  const handleDeleteUser = (user: User) => {
    if (window.confirm(`Are you sure you want to delete user "${user.firstName} ${user.lastName}"?`)) {
      // In a real app, this would make an API call
      console.log('Delete user:', user.id);
    }
  };

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    // This would be handled by the table component
    console.log('Sort by:', key, direction);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = userStatuses.find(s => s.id === status);
    return (
      <span className={`user-manage__status-badge user-manage__status-badge--${status}`}>
        {statusConfig?.label || status}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = userRoles.find(r => r.id === role);
    return (
      <span className={`user-manage__role-badge user-manage__role-badge--${role}`}>
        {roleConfig?.label || role}
      </span>
    );
  };

  const tableColumns = [
    {
      key: 'avatar',
      label: 'Avatar',
      width: '80px',
      render: (value: string, item: User) => (
        <div className="user-manage__avatar">
          <img src={item.avatar} alt={`${item.firstName} ${item.lastName}`} className="user-manage__avatar-img" />
        </div>
      )
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      width: '250px',
      render: (value: string, item: User) => (
        <div className="user-manage__user-info">
          <Text variant="p" size="sm" color="primary" className="user-manage__user-name">
            {item.firstName} {item.lastName}
          </Text>
          <Text variant="p" size="xs" color="muted" className="user-manage__user-email">
            {item.email}
          </Text>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      width: '120px',
      render: (value: string) => getRoleBadge(value)
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px',
      render: (value: string) => getStatusBadge(value)
    },
    {
      key: 'joinDate',
      label: 'Joined',
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
    <div className={`user-manage ${className}`}>
      <div className="user-manage__header">
        <div className="user-manage__title-section">
          <Title level="h1" size="xl" color="primary" className="user-manage__title">
            User Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="user-manage__subtitle">
            Manage all users in your platform
          </Text>
        </div>
        
        <div className="user-manage__actions">
          <Button
            variant="primary"
            size="md"
            onClick={handleAddUser}
            className="user-manage__add-btn"
          >
            + Add New User
          </Button>
        </div>
      </div>

      <div className="user-manage__filters">
        <div className="user-manage__filter-group">
          <Input
            type="text"
            placeholder={userFilter.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="user-manage__search-input"
          />
        </div>

        <div className="user-manage__filter-group">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="user-manage__filter-select"
          >
            {userStatuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="user-manage__filter-group">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="user-manage__filter-select"
          >
            {userRoles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        <div className="user-manage__filter-group">
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="user-manage__filter-select"
          >
            {locationOptions.map((location) => (
              <option key={location.value} value={location.value}>
                {location.label}
              </option>
            ))}
          </select>
        </div>

        <div className="user-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="user-manage__filter-select"
          >
            {userSortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="user-manage__stats">
        <div className="user-manage__stat">
          <Text variant="p" size="sm" color="muted" className="user-manage__stat-label">
            Total Users
          </Text>
          <Text variant="p" size="lg" color="primary" className="user-manage__stat-value">
            {filteredAndSortedUsers.length}
          </Text>
        </div>
        <div className="user-manage__stat">
          <Text variant="p" size="sm" color="muted" className="user-manage__stat-label">
            Active Users
          </Text>
          <Text variant="p" size="lg" color="primary" className="user-manage__stat-value">
            {filteredAndSortedUsers.filter(user => user.status === 'active').length}
          </Text>
        </div>
        <div className="user-manage__stat">
          <Text variant="p" size="sm" color="muted" className="user-manage__stat-label">
            New This Month
          </Text>
          <Text variant="p" size="lg" color="primary" className="user-manage__stat-value">
            {filteredAndSortedUsers.filter(user => {
              const joinDate = new Date(user.joinDate);
              const oneMonthAgo = new Date();
              oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
              return joinDate >= oneMonthAgo;
            }).length}
          </Text>
        </div>
        <div className="user-manage__stat">
          <Text variant="p" size="sm" color="muted" className="user-manage__stat-label">
            Total Revenue
          </Text>
          <Text variant="p" size="lg" color="primary" className="user-manage__stat-value">
            ${filteredAndSortedUsers.reduce((sum, user) => sum + user.totalSpent, 0).toFixed(2)}
          </Text>
        </div>
      </div>

      <div className="user-manage__table">
        <AdminTable
          columns={tableColumns}
          data={filteredAndSortedUsers}
          onSort={handleSort}
          onView={handleViewUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          emptyMessage="No users found matching your criteria"
        />
      </div>

      {showAddModal && (
        <div className="user-manage__modal-overlay">
          <div className="user-manage__modal">
            <div className="user-manage__modal-header">
              <Title level="h2" size="lg" color="primary">
                Add New User
              </Title>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddModal(false)}
                className="user-manage__modal-close"
              >
                ✕
              </Button>
            </div>
            <div className="user-manage__modal-content">
              <Text variant="p" size="md" color="secondary">
                User creation form would go here. This is a placeholder for the add user functionality.
              </Text>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManage;
