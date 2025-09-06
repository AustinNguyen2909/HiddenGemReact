import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, Title, Text } from '../../components';
import './LocationScreen.css';

interface LocationScreenProps {
  className?: string;
}

// Reusable Components
const StoreCard: React.FC<{ 
  store: any; 
  onViewDetails: (storeId: number) => void;
  onGetDirections: (store: any) => void;
}> = ({ store, onViewDetails, onGetDirections }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="store-card" onClick={() => onViewDetails(store.id)}>
      <div className="store-image-container">
        <img src={store.image} alt={store.name} className="store-image" />
        <div className="store-overlay">
          <button 
            className="wishlist-btn"
            onClick={(e) => {
              e.stopPropagation();
              // Handle wishlist functionality
            }}
          >
            <span className="wishlist-icon">♡</span>
          </button>
        </div>
      </div>
      
      <div className="store-info">
        <div className="store-details">
          <div className="store-hours-price">
            <Text variant="p" size="sm" color="secondary">
              Uptime: {store.hours}
            </Text>
            <Text variant="p" size="sm" color="secondary">
              Price: {store.priceRange}
            </Text>
          </div>
          
          <Title level="h3" size="md" color="primary" className="store-name">
            {store.name}
          </Title>
          
          <div className="store-location-rating">
            <div className="location-info">
              <img src="/api/placeholder/17/22" alt="Location" className="location-icon" />
              <Text variant="p" size="sm" color="secondary">
                {store.distance}
              </Text>
            </div>
            
            <div className="rating-stars">
              {renderStars(store.rating)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LocationScreen: React.FC<LocationScreenProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  // Sample store data matching Figma design
  const stores = [
    {
      id: 1,
      name: "Sumatra mandheling",
      image: "/api/placeholder/305/288",
      hours: "9:00AM - 10:00PM",
      priceRange: "$18.50 – $87.50",
      distance: "3.5 Km",
      rating: 3.5
    },
    {
      id: 2,
      name: "Sumatra mandheling",
      image: "/api/placeholder/305/288",
      hours: "9:00AM - 10:00PM",
      priceRange: "$18.50 – $87.50",
      distance: "3.5 Km",
      rating: 3.5
    },
    {
      id: 3,
      name: "Sumatra mandheling",
      image: "/api/placeholder/305/288",
      hours: "9:00AM - 10:00PM",
      priceRange: "$18.50 – $87.50",
      distance: "3.5 Km",
      rating: 3.5
    },
    {
      id: 4,
      name: "Sumatra mandheling",
      image: "/api/placeholder/305/288",
      hours: "9:00AM - 10:00PM",
      priceRange: "$18.50 – $87.50",
      distance: "3.5 Km",
      rating: 3.5
    }
  ];

  const handleViewDetails = (storeId: number) => {
    navigate(`/store/${storeId}`);
  };

  const handleGetDirections = (store: any) => {
    console.log('Get directions to:', store.name);
  };

  return (
    <div className={`location-screen ${className}`}>
      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <div className="map-image">
            <img src="/api/placeholder/1280/600" alt="Map" />
          </div>
          <div className="map-overlay">
            <div className="location-search">
              <h2 className="location-title">coffee shop near you</h2>
              <button className="look-around-btn">Look around here</button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="banner-overlay">
          <div className="banner-content">
            <div className="banner-text">
              <p className="banner-highlight">Hightlight news, ads, discount, HOT HOT</p>
              <h1 className="banner-title">Find the café, feel the vibe</h1>
            </div>
            <div className="banner-search">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="search-input"
                />
                <button className="search-btn">Search</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sort Section */}
      <section className="sort-section">
        <div className="sort-container">
          <p className="sort-text">Showing 1 – 27 stores of 23250 store</p>
          <div className="sort-controls">
            <button className="sort-btn">
              <span className="sort-icon">⚙</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stores Section */}
      <main className="stores-main">
        <div className="stores-container">
          <div className="stores-header">
            <h2 className="stores-title">Related Stores</h2>
            <div className="stores-controls">
              <div className="pagination-dots">
                <span className="dot active"></span>
                <span className="dot"></span>
              </div>
            </div>
          </div>

          <div className="stores-grid">
            {stores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onViewDetails={handleViewDetails}
                onGetDirections={handleGetDirections}
              />
            ))}
          </div>

          <div className="load-more-section">
            <button className="load-more-btn">LOAD MORE</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LocationScreen;