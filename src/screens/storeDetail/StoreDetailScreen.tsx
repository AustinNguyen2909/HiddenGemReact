import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Footer, Title, Text, Button, Input, StoreCard } from '../../components';
import { cafesService } from '../../services/cafes';
import { Cafe } from '../../services/types';
import './StoreDetailScreen.css';
import StoreDetail from "../../assets/images/store-detail.png";


interface StoreDetailScreenProps {
  className?: string;
}

// Helper function to safely convert rating to number
const getRating = (rating: string | number): number => {
  if (typeof rating === 'string') {
    return parseFloat(rating) || 0;
  }
  return rating || 0;
};


const StoreDetailScreen: React.FC<StoreDetailScreenProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'details' | 'menu' | 'reviews' | 'photos'>('details');
  const [store, setStore] = useState<Cafe | null>(null);
  const [relatedStores, setRelatedStores] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch store details on component mount
  useEffect(() => {
    const fetchStoreDetails = async () => {
      if (!id) {
        setError('Store ID not found');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const storeData = await cafesService.detail(parseInt(id));
        setStore(storeData.data);

        // Fetch related stores (first page of cafes)
        const relatedData = await cafesService.list(1, 4);
        setRelatedStores(relatedData.data.items);
      } catch (err) {
        setError('Failed to load store details');
        console.error('Error fetching store details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreDetails();
  }, [id]);

  const handleViewDetails = (storeId: number) => {
    navigate(`/store/${storeId}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className={`store-detail-screen ${className}`}>
        <div className="loading-container">
          <Text variant="p" size="lg" color="primary">Loading store details...</Text>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`store-detail-screen ${className}`}>
        <div className="error-container">
          <Text variant="p" size="lg" color="primary">{error}</Text>
          <Button variant="primary" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // No store data
  if (!store) {
    return (
      <div className={`store-detail-screen ${className}`}>
        <div className="error-container">
          <Text variant="p" size="lg" color="primary">Store not found</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={`store-detail-screen ${className}`}>
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-overlay">
          <div className="hero-overlay-background">
            <img src={StoreDetail} alt="Store background" />
          </div>
        </div>
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
                  {store.ten_cua_hang}
                </Title>
                <div className="store-rating">
                  <span className="stars">
                    {'★'.repeat(Math.floor(getRating(store.diem_danh_gia_trung_binh)))}
                    {'☆'.repeat(5 - Math.floor(getRating(store.diem_danh_gia_trung_binh)))}
                  </span>
                  <Text variant="p" size="md" color="secondary">
                    {getRating(store.diem_danh_gia_trung_binh).toFixed(1)} ({store.luot_xem} views)
                  </Text>
                </div>
              </div>
              <div className="store-price">
                <Text variant="p" size="lg" color="primary" className="price">
                  {getRating(store.diem_danh_gia_trung_binh) >= 4 ? '$$$' : getRating(store.diem_danh_gia_trung_binh) >= 3 ? '$$' : '$'}
                </Text>
                <Text variant="p" size="sm" color="secondary">
                  {getRating(store.diem_danh_gia_trung_binh) >= 4 ? 'High-end' : getRating(store.diem_danh_gia_trung_binh) >= 3 ? 'Moderate' : 'Budget'}
                </Text>
              </div>
            </div>

            <div className="store-description">
              <Text variant="p" size="md" color="secondary">
                {store.mo_ta || 'A wonderful coffee shop with great atmosphere and quality beverages.'}
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
              <StoreCard 
                key={store.id_cua_hang} 
                store={store} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default StoreDetailScreen;
