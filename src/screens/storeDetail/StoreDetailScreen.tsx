import React, { useState } from 'react';
import { Footer, Title, Text, Button, Input } from '../../components';
import './StoreDetailScreen.css';

interface StoreDetailScreenProps {
  className?: string;
}

// Reusable Components
const StoreCard: React.FC<{ store: any }> = ({ store }) => (
  <div className="store-card">
    <div className="store-image-container">
      <img src={store.image} alt={store.name} className="store-image" />
      <div className="store-overlay">
        <button className="wishlist-btn">
          <span className="wishlist-icon">♡</span>
        </button>
      </div>
    </div>
    <div className="store-info">
      <div className="store-details">
        <Text variant="p" size="sm" color="secondary" className="store-hours">
          Uptime: 9:00AM - 10:00PM
        </Text>
        <Text variant="p" size="sm" color="secondary" className="store-price">
          Price: $18.50 – $87.50
        </Text>
      </div>
      <Title level="h3" size="md" color="primary" className="store-name">
        {store.name}
      </Title>
      <div className="store-meta">
        <div className="store-distance">
          <div className="location-icon"></div>
          <Text variant="p" size="sm" color="secondary">3.5 Km</Text>
        </div>
        <div className="store-rating">
          <span className="stars">★★★★☆</span>
        </div>
      </div>
    </div>
  </div>
);

const StoreDetailScreen: React.FC<StoreDetailScreenProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'menu' | 'reviews' | 'photos'>('details');

  const relatedStores = [
    { id: 1, name: "Sumatra mandheling", image: "/api/placeholder/305/288" },
    { id: 2, name: "Sumatra mandheling", image: "/api/placeholder/305/288" },
    { id: 3, name: "Sumatra mandheling", image: "/api/placeholder/305/288" },
    { id: 4, name: "Sumatra mandheling", image: "/api/placeholder/305/288" }
  ];

  return (
    <div className={`store-detail-screen ${className}`}>
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-search">
            <div className="search-slogan">
              <Text variant="p" size="lg" color="white" className="highlight-text">
                Find the perfect coffee shop for your taste
              </Text>
            </div>
            <div className="search-form">
              <div className="search-input-container">
                <Input 
                  type="text" 
                  placeholder="Search for coffee shops, cafes, or locations..."
                  className="search-input"
                />
                <Button variant="primary" size="lg" className="search-button">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="store-detail-main">
        <div className="store-detail-container">
          {/* Store Information */}
          <div className="store-info-section">
            <div className="store-header">
              <div className="store-title">
                <Title level="h1" size="xl" color="primary">
                  Coffee Corner
                </Title>
                <div className="store-rating">
                  <span className="stars">★★★★★</span>
                  <Text variant="p" size="md" color="secondary">
                    4.8 (124 reviews)
                  </Text>
                </div>
              </div>
              <div className="store-price">
                <Text variant="p" size="lg" color="primary" className="price">
                  $$$
                </Text>
                <Text variant="p" size="sm" color="secondary">
                  Moderate
                </Text>
              </div>
            </div>
            
            <div className="store-description">
              <Text variant="p" size="md" color="secondary">
                A cozy coffee shop with a warm atmosphere, serving freshly brewed coffee and delicious pastries. 
                Perfect for work, study, or just relaxing with friends.
              </Text>
            </div>
          </div>

          {/* Store Image Gallery */}
          <div className="store-gallery">
            <div className="main-image">
              <img src="/api/placeholder/630/516" alt="Store interior" />
              <button className="wishlist-btn">
                <span className="wishlist-icon">♡</span>
              </button>
            </div>
            <div className="thumbnail-gallery">
              <div className="thumbnail active">
                <img src="/api/placeholder/88/100" alt="Thumbnail 1" />
              </div>
              <div className="thumbnail">
                <img src="/api/placeholder/88/100" alt="Thumbnail 2" />
              </div>
              <div className="thumbnail">
                <img src="/api/placeholder/88/100" alt="Thumbnail 3" />
              </div>
              <div className="thumbnail">
                <img src="/api/placeholder/88/100" alt="Thumbnail 4" />
              </div>
              <div className="gallery-controls">
                <button className="gallery-prev">‹</button>
                <button className="gallery-next">›</button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <section className="store-tabs">
          <div className="tab-container">
            <div className="tab-navigation">
              <button 
                className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Shop Details
              </button>
              <button 
                className={`tab-button ${activeTab === 'menu' ? 'active' : ''}`}
                onClick={() => setActiveTab('menu')}
              >
                Show Menu
              </button>
              <button 
                className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Customer Reviews
              </button>
              <button 
                className={`tab-button ${activeTab === 'photos' ? 'active' : ''}`}
                onClick={() => setActiveTab('photos')}
              >
                Customer Photos
              </button>
            </div>
            <div className="tab-indicator"></div>
          </div>
        </section>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'details' && (
            <div className="details-content">
              <div className="content-card">
                <Text variant="p" size="sm" color="secondary" className="content-text">
                  As is known to all, coffee shops are places where modern people gather for leisure and business communication. The reason why coffee shops have their unique attraction is that what they sell is not only coffee, but also a kind of quality, culture and ideas. It is believed that many literary young people have a dream to open their own coffee shop. No matter in the morning when insects and birds are chirping or in the evening when the sky is full of clouds, they will watch their own coffee shop, or play ukulele gently, or read San Mao or Shakespeare, and have a few words with regular guests from time to time.
                </Text>
                <Text variant="p" size="sm" color="secondary" className="content-text">
                  3 D design Details

                  Please contact us to talk with your ideas about the design, such as style and layout or some special requirements.

                  Please send us your floor plan and the size of your shop, then we can see your shop shape first.

                  The design fee is $500-$800, which depend on the size of your shop.

                  The design time is about 3-5 working days for a shop, and the design can be modified.

                  After you confirm the design, we will offer you the floor plan and technology drawing, which including all details for you.
                </Text>
              </div>
            </div>
          )}
        </div>

        {/* Related Stores */}
        <section className="related-stores">
          <div className="related-stores-header">
            <Title level="h2" size="lg" color="primary" className="related-title">
              Related Stores
            </Title>
            <div className="related-controls">
              <button className="prev-btn">‹</button>
              <button className="next-btn">›</button>
            </div>
          </div>
          <div className="related-stores-grid">
            {relatedStores.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StoreDetailScreen;
