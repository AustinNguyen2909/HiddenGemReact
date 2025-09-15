import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Title, Text, Button } from '../../components';
import './SubService.css';

interface SubServiceProps {
  className?: string;
}

interface ServiceType {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  items: ServiceItem[];
  isEnabled: boolean;
}

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  price?: string;
  duration?: string;
  isAvailable: boolean;
}

const serviceTypes: ServiceType[] = [
  {
    id: 'service',
    title: 'Service',
    description: 'Manage your coffee shop services and offerings',
    icon: '☕',
    color: '#8B4513',
    isEnabled: true,
    items: [
      { id: 'espresso', name: 'Espresso', description: 'Single or double shot espresso', price: '$2.50', duration: '2 min', isAvailable: true },
      { id: 'latte', name: 'Latte', description: 'Espresso with steamed milk', price: '$4.00', duration: '3 min', isAvailable: true },
      { id: 'cappuccino', name: 'Cappuccino', description: 'Espresso with equal parts steamed milk and foam', price: '$3.50', duration: '3 min', isAvailable: true },
      { id: 'americano', name: 'Americano', description: 'Espresso with hot water', price: '$2.75', duration: '2 min', isAvailable: true },
      { id: 'cold-brew', name: 'Cold Brew', description: 'Slow-steeped cold coffee', price: '$3.25', duration: '1 min', isAvailable: false }
    ]
  },
  {
    id: 'client',
    title: 'Client',
    description: 'Customer service and client management features',
    icon: '👥',
    color: '#4A90E2',
    isEnabled: true,
    items: [
      { id: 'loyalty-program', name: 'Loyalty Program', description: 'Points-based rewards system', isAvailable: true },
      { id: 'reservations', name: 'Reservations', description: 'Table booking system', isAvailable: true },
      { id: 'feedback', name: 'Feedback System', description: 'Customer review collection', isAvailable: true },
      { id: 'notifications', name: 'Notifications', description: 'SMS and email alerts', isAvailable: false }
    ]
  },
  {
    id: 'pay',
    title: 'Pay',
    description: 'Payment processing and billing options',
    icon: '💳',
    color: '#50C878',
    isEnabled: true,
    items: [
      { id: 'cash', name: 'Cash Payment', description: 'Traditional cash transactions', isAvailable: true },
      { id: 'card', name: 'Card Payment', description: 'Credit/debit card processing', isAvailable: true },
      { id: 'mobile', name: 'Mobile Payment', description: 'Apple Pay, Google Pay', isAvailable: true },
      { id: 'crypto', name: 'Cryptocurrency', description: 'Bitcoin and other crypto payments', isAvailable: false }
    ]
  },
  {
    id: 'parking',
    title: 'Parking',
    description: 'Parking facilities and management',
    icon: '🅿️',
    color: '#FF6B35',
    isEnabled: false,
    items: [
      { id: 'valet', name: 'Valet Parking', description: 'Full-service valet parking', price: '$5.00', isAvailable: false },
      { id: 'self-park', name: 'Self Parking', description: 'Customer self-parking area', isAvailable: false },
      { id: 'reserved', name: 'Reserved Spots', description: 'Pre-booked parking spaces', isAvailable: false }
    ]
  },
  {
    id: 'amenities',
    title: 'Amenities',
    description: 'Additional facilities and services',
    icon: '🏪',
    color: '#9B59B6',
    isEnabled: true,
    items: [
      { id: 'wifi', name: 'Free WiFi', description: 'Complimentary internet access', isAvailable: true },
      { id: 'outdoor', name: 'Outdoor Seating', description: 'Patio and outdoor tables', isAvailable: true },
      { id: 'meeting', name: 'Meeting Room', description: 'Private space for meetings', price: '$20/hour', isAvailable: true },
      { id: 'pet-friendly', name: 'Pet Friendly', description: 'Welcome to bring pets', isAvailable: false }
    ]
  }
];

const SubService: React.FC<SubServiceProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleServiceToggle = (serviceId: string) => {
    // Toggle service enabled/disabled state
    console.log('Toggle service:', serviceId);
  };

  const handleItemToggle = (serviceId: string, itemId: string) => {
    // Toggle individual service item availability
    console.log('Toggle item:', serviceId, itemId);
  };

  const handleEditService = (serviceId: string) => {
    navigate(`/admin/introductions/${serviceId}/edit`);
  };

  return (
    <div className={`sub-service ${className}`}>
      <div className="sub-service__header">
        <div className="sub-service__header-left">
          <Title level="h1" size="xl" color="primary" className="sub-service__title">
            Service Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="sub-service__description">
            Manage your coffee shop services and features
          </Text>
        </div>
        <div className="sub-service__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/introductions')}>
            Back
          </Button>
          <Button variant="primary" size="md" onClick={() => navigate('/admin/introductions/settings')}>
            Settings
          </Button>
        </div>
      </div>

      <div className="sub-service__content">
        <div className="sub-service__grid">
          {serviceTypes.map((serviceType) => (
            <div key={serviceType.id} className={`sub-service__card ${!serviceType.isEnabled ? 'sub-service__card--disabled' : ''}`}>
              <div className="sub-service__card-header">
                <div className="sub-service__card-icon" style={{ backgroundColor: serviceType.color }}>
                  {serviceType.icon}
                </div>
                <div className="sub-service__card-info">
                  <Title level="h3" size="md" color="primary" className="sub-service__card-title">
                    {serviceType.title}
                  </Title>
                  <Text variant="p" size="sm" color="secondary" className="sub-service__card-description">
                    {serviceType.description}
                  </Text>
                </div>
                <div className="sub-service__card-actions">
                  <label className="sub-service__toggle">
                    <input
                      type="checkbox"
                      checked={serviceType.isEnabled}
                      onChange={() => handleServiceToggle(serviceType.id)}
                    />
                    <span className="sub-service__toggle-slider"></span>
                  </label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditService(serviceType.id)}
                    disabled={!serviceType.isEnabled}
                  >
                    Edit
                  </Button>
                </div>
              </div>

              <div className="sub-service__card-content">
                <div className="sub-service__items">
                  {serviceType.items.map((item) => (
                    <div key={item.id} className={`sub-service__item ${!item.isAvailable ? 'sub-service__item--unavailable' : ''}`}>
                      <div className="sub-service__item-main">
                        <div className="sub-service__item-info">
                          <Text variant="p" size="sm" color="primary" className="sub-service__item-name">
                            {item.name}
                          </Text>
                          <Text variant="p" size="xs" color="secondary" className="sub-service__item-description">
                            {item.description}
                          </Text>
                          {(item.price || item.duration) && (
                            <div className="sub-service__item-meta">
                              {item.price && (
                                <Text variant="span" size="xs" color="primary" className="sub-service__item-price">
                                  {item.price}
                                </Text>
                              )}
                              {item.duration && (
                                <Text variant="span" size="xs" color="muted" className="sub-service__item-duration">
                                  {item.duration}
                                </Text>
                              )}
                            </div>
                          )}
                        </div>
                        <label className="sub-service__item-toggle">
                          <input
                            type="checkbox"
                            checked={item.isAvailable}
                            onChange={() => handleItemToggle(serviceType.id, item.id)}
                            disabled={!serviceType.isEnabled}
                          />
                          <span className="sub-service__item-toggle-slider"></span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubService;
