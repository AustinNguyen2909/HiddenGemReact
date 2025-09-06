import React, { useState } from 'react';
import { Footer, Title, Text, Card, Button, Input, ProductCard } from '../../components';
import { 
  storeHeroContent, 
  categories, 
  allProducts, 
  filterGroups, 
  sortOptions, 
  paginationConfig 
} from '../../dummyData';
import './StoreScreen.css';

interface StoreScreenProps {
  className?: string;
}

// Reusable Components
const CategoryCard: React.FC<{ 
  category: any; 
  isActive: boolean; 
  onClick: () => void 
}> = ({ category, isActive, onClick }) => (
  <Card 
    variant={isActive ? "elevated" : "outlined"}
    padding="lg" 
    shadow={isActive ? "md" : "sm"}
    hover
    className={`category-card ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    <div className="category-icon-placeholder">
      <Text variant="p" size="sm" color="secondary">Icon</Text>
    </div>
    <Title level="h3" size="md" color="primary" align="center">
      {category.name}
    </Title>
    <Text variant="p" size="sm" color="secondary" align="center">
      {category.count} items
    </Text>
  </Card>
);


const FilterGroup: React.FC<{ filterGroup: any }> = ({ filterGroup }) => (
  <div className="filter-group">
    <Title level="h4" size="sm" color="primary">{filterGroup.title}</Title>
    {filterGroup.type === 'range' ? (
      <div className="price-range">
        <Input type="number" placeholder="Min" className="price-input" />
        <span>-</span>
        <Input type="number" placeholder="Max" className="price-input" />
      </div>
    ) : (
      <div className={`${filterGroup.id}-filters`}>
        {filterGroup.options.map((option: any) => (
          <label key={option.id} className={`${filterGroup.id}-filter`}>
            <input type="checkbox" />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    )}
  </div>
);

const PaginationButton: React.FC<{ 
  page: number; 
  isActive: boolean; 
  onClick: () => void 
}> = ({ page, isActive, onClick }) => (
  <Button 
    variant={isActive ? "primary" : "outline"} 
    size="sm"
    onClick={onClick}
  >
    {page}
  </Button>
);

const StoreScreen: React.FC<StoreScreenProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartItems] = useState<number>(0);

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory);

  return (
    <div className={`store-screen ${className}`}>
      {/* Store Hero Section */}
      <section className="store-hero">
        <div className="store-hero__container">
          <Title level="h1" size="xl" color="white" align="center">
            {storeHeroContent.title}
          </Title>
          <Text variant="p" size="lg" color="white" align="center" className="store-hero__subtitle">
            {storeHeroContent.subtitle}
          </Text>
          <div className="store-hero__search">
            <Input 
              type="text" 
              placeholder={storeHeroContent.searchPlaceholder}
              className="store-hero__search-input"
            />
            <Button variant="primary" size="lg">
              {storeHeroContent.primaryButton}
            </Button>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="categories-section">
        <div className="section-container">
          <Title level="h2" size="lg" align="center" color="primary">
            Shop by Category
          </Title>
          <div className="categories-grid">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                isActive={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Store Content */}
      <main className="store-main">
        <div className="store-container">
          <div className="store-layout">
            {/* Filters Sidebar */}
            <aside className="filters-sidebar">
              <Card variant="elevated" padding="lg" shadow="sm">
                <Title level="h3" size="md" color="primary">
                  Filters
                </Title>
                
                {filterGroups.map((filterGroup) => (
                  <FilterGroup key={filterGroup.id} filterGroup={filterGroup} />
                ))}

                <Button variant="secondary" size="sm" className="clear-filters">
                  Clear All
                </Button>
              </Card>
            </aside>

            {/* Products Grid */}
            <div className="products-section">
              <div className="products-header">
                <div className="products-info">
                  <Title level="h2" size="lg" color="primary">
                    {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
                  </Title>
                  <Text variant="p" size="md" color="secondary">
                    {filteredProducts.length} products found
                  </Text>
                </div>
                <div className="products-controls">
                  <select className="sort-select">
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="view-toggle">
                    <Button variant="outline" size="sm">Grid</Button>
                    <Button variant="outline" size="sm">List</Button>
                  </div>
                </div>
              </div>

              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    variant="store"
                    showRating={true}
                    showQuickView={true}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="pagination">
                <Button variant="outline" size="sm">Previous</Button>
                <div className="pagination-numbers">
                  {Array.from({ length: paginationConfig.totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationButton
                      key={page}
                      page={page}
                      isActive={page === paginationConfig.currentPage}
                      onClick={() => {}}
                    />
                  ))}
                </div>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Shopping Cart Sidebar */}
      <aside className={`cart-sidebar ${cartItems > 0 ? 'open' : ''}`}>
        <div className="cart-header">
          <Title level="h3" size="md" color="primary">
            Shopping Cart ({cartItems})
          </Title>
          <Button variant="outline" size="sm">×</Button>
        </div>
        <div className="cart-content">
          <div className="cart-empty">
            <Text variant="p" size="md" color="secondary" align="center">
              Your cart is empty
            </Text>
            <Text variant="p" size="sm" color="secondary" align="center">
              Add some products to get started
            </Text>
          </div>
        </div>
        <div className="cart-footer">
          <div className="cart-total">
            <Text variant="p" size="lg" weight="semibold" color="primary">
              Total: $0.00
            </Text>
          </div>
          <Button variant="primary" size="lg" className="checkout-btn">
            Checkout
          </Button>
        </div>
      </aside>

      <Footer />
    </div>
  );
};

export default StoreScreen;
