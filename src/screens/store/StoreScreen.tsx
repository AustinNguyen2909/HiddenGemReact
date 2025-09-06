import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer, Title, Text, Button, Input } from '../../components';
import { allProducts } from '../../dummyData';
import './StoreScreen.css';

interface StoreScreenProps {
  className?: string;
}


const StoreScreen: React.FC<StoreScreenProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const filteredProducts = allProducts;

  const handleViewStoreDetail = (productId: number) => {
    navigate(`/store/${productId}`);
  };

  return (
    <div className={`store-screen ${className}`}>
      {/* Store Hero Section */}
      <section className="store-hero">
        <div className="store-hero__container">
          <div className="hero-content">
            <Title level="h1" size="xl" color="white">
              Find Your Perfect Coffee
            </Title>
            <Text variant="p" size="lg" color="white" className="hero-subtitle">
              Discover amazing coffee shops and cafes near you
            </Text>
            <div className="hero-search">
              <Input 
                type="text" 
                placeholder="Search for coffee shops, cafes, or locations..."
                className="hero-search-input"
              />
              <Button variant="primary" size="lg" className="hero-search-button">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sort By Section */}
      <section className="sort-section">
        <div className="container">
          <div className="sort-controls">
            <div className="sort-left">
              <Text variant="p" size="md" color="secondary">
                Sort by:
              </Text>
              <select className="sort-select">
                <option value="relevance">Relevance</option>
                <option value="rating">Rating</option>
                <option value="distance">Distance</option>
                <option value="price">Price</option>
              </select>
            </div>
            <div className="sort-right">
              <Text variant="p" size="md" color="secondary">
                24 results found
              </Text>
            </div>
          </div>
        </div>
      </section>


      {/* Store Content */}
      <main className="store-main">
        <div className="container">
          <div className="store-layout">
            {/* Filters Sidebar */}
            <aside className="filters-sidebar">
              <div className="filters-card">
                <Title level="h3" size="md" color="primary" className="filters-title">
                  Filters
                </Title>
                
                <div className="filter-group">
                  <Title level="h4" size="sm" color="primary">Price Range</Title>
                  <div className="price-range">
                    <Input type="number" placeholder="Min" className="price-input" />
                    <span>-</span>
                    <Input type="number" placeholder="Max" className="price-input" />
                  </div>
                </div>

                <div className="filter-group">
                  <Title level="h4" size="sm" color="primary">Rating</Title>
                  <div className="rating-filters">
                    <label className="rating-filter">
                      <input type="checkbox" />
                      <span>★★★★★ (4.5+)</span>
                    </label>
                    <label className="rating-filter">
                      <input type="checkbox" />
                      <span>★★★★☆ (4.0+)</span>
                    </label>
                    <label className="rating-filter">
                      <input type="checkbox" />
                      <span>★★★☆☆ (3.5+)</span>
                    </label>
                  </div>
                </div>

                <div className="filter-group">
                  <Title level="h4" size="sm" color="primary">Distance</Title>
                  <div className="distance-filters">
                    <label className="distance-filter">
                      <input type="checkbox" />
                      <span>Under 1 mile</span>
                    </label>
                    <label className="distance-filter">
                      <input type="checkbox" />
                      <span>1-3 miles</span>
                    </label>
                    <label className="distance-filter">
                      <input type="checkbox" />
                      <span>3-5 miles</span>
                    </label>
                  </div>
                </div>

                <Button variant="secondary" size="sm" className="clear-filters">
                  Clear All
                </Button>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="products-section">
              <div className="products-grid">
                {filteredProducts.slice(0, 12).map((product) => (
                  <div 
                    key={product.id} 
                    className="store-card"
                    onClick={() => handleViewStoreDetail(product.id)}
                  >
                    <div className="store-image">
                      <img src={product.image} alt={product.name} />
                      <button 
                        className="wishlist-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle wishlist functionality
                        }}
                      >
                        ♡
                      </button>
                    </div>
                    <div className="store-info">
                      <div className="store-rating">
                        <span className="stars">★★★★☆</span>
                        <Text variant="p" size="sm" color="secondary">4.2 (82 reviews)</Text>
                      </div>
                      <Title level="h3" size="md" color="primary" className="store-name">
                        {product.name}
                      </Title>
                      <Text variant="p" size="sm" color="secondary" className="store-description">
                        {product.description}
                      </Text>
                      <div className="store-meta">
                        <Text variant="p" size="sm" color="secondary" className="store-distance">
                          📍 0.5 miles away
                        </Text>
                        <Text variant="p" size="sm" color="primary" className="store-price">
                          $$$
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              <div className="load-more-section">
                <Button variant="outline" size="lg" className="load-more-btn">
                  Load More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>


      <Footer />
    </div>
  );
};

export default StoreScreen;
