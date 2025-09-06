import React, { useState } from 'react';
import { Footer, Title, Text, Card, Button, ProductCard, LocationItem } from '../../components';
import { 
  storeDetailHero,
  storeFeatures,
  storeHours,
  featuredStoreProducts,
  storeReviews,
  storeGallery,
  storeContact,
  storePolicies
} from '../../dummyData';
import './StoreDetailScreen.css';

interface StoreDetailScreenProps {
  className?: string;
}

// Reusable Components
const StoreFeature: React.FC<{ feature: any }> = ({ feature }) => (
  <Card variant="elevated" padding="md" shadow="sm" className="store-feature">
    <div className="feature-icon">
      <Text variant="p" size="sm" color="secondary">{feature.icon}</Text>
    </div>
    <Title level="h4" size="sm" color="primary">
      {feature.title}
    </Title>
    <Text variant="p" size="xs" color="secondary">
      {feature.description}
    </Text>
  </Card>
);

const ReviewCard: React.FC<{ review: any }> = ({ review }) => (
  <Card variant="elevated" padding="lg" shadow="sm" className="review-card">
    <div className="review-header">
      <div className="review-author">
        <Title level="h4" size="sm" color="primary">
          {review.author}
        </Title>
        <div className="review-rating">
          <span className="stars">{'★'.repeat(review.rating)}</span>
          <Text variant="p" size="xs" color="secondary">
            {review.date}
          </Text>
        </div>
      </div>
    </div>
    <Text variant="p" size="sm" color="secondary" className="review-text">
      {review.text}
    </Text>
    <div className="review-footer">
      <Button variant="outline" size="sm">
        Helpful ({review.helpful})
      </Button>
    </div>
  </Card>
);

const GalleryImage: React.FC<{ image: any }> = ({ image }) => (
  <div className="gallery-image">
    <img src={image.image} alt={image.alt} />
  </div>
);

const StoreDetailScreen: React.FC<StoreDetailScreenProps> = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'menu' | 'reviews' | 'photos'>('overview');

  return (
    <div className={`store-detail-screen ${className}`}>
      {/* Hero Section */}
      <section className="store-detail-hero">
        <div className="hero-background">
          <img src={storeDetailHero.backgroundImage} alt="Store interior" />
        </div>
        <div className="hero-content">
          <div className="hero-info">
            <Title level="h1" size="xl" color="white">
              {storeDetailHero.title}
            </Title>
            <Text variant="p" size="lg" color="white" className="hero-subtitle">
              {storeDetailHero.subtitle}
            </Text>
            <div className="hero-details">
              <div className="hero-rating">
                <span className="stars">{'★'.repeat(5)}</span>
                <Text variant="p" size="md" color="white">
                  {storeDetailHero.rating} ({storeDetailHero.reviewCount} reviews)
                </Text>
              </div>
              <div className="hero-status">
                <div className={`status-indicator ${storeDetailHero.isOpen ? 'open' : 'closed'}`}>
                  {storeDetailHero.isOpen ? 'Open' : 'Closed'}
                </div>
                <Text variant="p" size="sm" color="white">
                  {storeDetailHero.hours}
                </Text>
              </div>
            </div>
            <div className="hero-actions">
              <Button variant="primary" size="lg">
                Get Directions
              </Button>
              <Button variant="secondary" size="lg">
                Call Store
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="store-tabs">
        <div className="section-container">
          <div className="tab-navigation">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'menu', label: 'Menu' },
              { id: 'reviews', label: 'Reviews' },
              { id: 'photos', label: 'Photos' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id as any)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <main className="store-detail-main">
        <div className="section-container">
          {activeTab === 'overview' && (
            <div className="overview-content">
              {/* Store Features */}
              <section className="store-features-section">
                <Title level="h2" size="lg" color="primary">
                  Store Features
                </Title>
                <div className="features-grid">
                  {storeFeatures.map((feature) => (
                    <StoreFeature key={feature.id} feature={feature} />
                  ))}
                </div>
              </section>

              {/* Store Hours */}
              <section className="store-hours-section">
                <Title level="h2" size="lg" color="primary">
                  Store Hours
                </Title>
                <Card variant="elevated" padding="lg" shadow="sm">
                  <div className="hours-list">
                    {storeHours.map((day, index) => (
                      <div key={index} className="hours-item">
                        <Text variant="p" size="md" weight="semibold" color="primary">
                          {day.day}
                        </Text>
                        <Text variant="p" size="md" color="secondary">
                          {day.hours}
                        </Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>

              {/* Contact Information */}
              <section className="store-contact-section">
                <Title level="h2" size="lg" color="primary">
                  Contact Information
                </Title>
                <div className="contact-grid">
                  <LocationItem title="Phone" content={storeContact.phone} />
                  <LocationItem title="Email" content={storeContact.email} />
                  <LocationItem title="Website" content={storeContact.website} />
                </div>
              </section>

              {/* Store Policies */}
              <section className="store-policies-section">
                <Title level="h2" size="lg" color="primary">
                  Store Policies
                </Title>
                <Card variant="elevated" padding="lg" shadow="sm">
                  <div className="policies-list">
                    {Object.entries(storePolicies).map(([key, value]) => (
                      <div key={key} className="policy-item">
                        <Text variant="p" size="sm" weight="semibold" color="primary">
                          {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </Text>
                        <Text variant="p" size="sm" color="secondary">
                          {value}
                        </Text>
                      </div>
                    ))}
                  </div>
                </Card>
              </section>
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="menu-content">
              <Title level="h2" size="lg" color="primary">
                Featured Items
              </Title>
              <div className="menu-grid">
                {featuredStoreProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    variant="store"
                    showRating={true}
                    showQuickView={true}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-content">
              <div className="reviews-header">
                <Title level="h2" size="lg" color="primary">
                  Customer Reviews
                </Title>
                <div className="reviews-summary">
                  <div className="rating-summary">
                    <span className="rating-number">{storeDetailHero.rating}</span>
                    <div className="rating-details">
                      <span className="stars">{'★'.repeat(5)}</span>
                      <Text variant="p" size="sm" color="secondary">
                        Based on {storeDetailHero.reviewCount} reviews
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <div className="reviews-grid">
                {storeReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'photos' && (
            <div className="photos-content">
              <Title level="h2" size="lg" color="primary">
                Store Gallery
              </Title>
              <div className="gallery-grid">
                {storeGallery.map((image) => (
                  <GalleryImage key={image.id} image={image} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StoreDetailScreen;
