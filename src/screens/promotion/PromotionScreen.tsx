import React, { useState } from 'react';
import { Footer, Title, Text, Button } from '../../components';
import { promotionHero, featuredPromotions, allPromotions, promotionCategories, howToUse, termsAndConditions } from '../../dummyData';
import './PromotionScreen.css';

interface PromotionScreenProps {
  className?: string;
}


const PromotionScreen: React.FC<PromotionScreenProps> = ({ className = '' }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredPromotions = selectedCategory === 'all' 
    ? allPromotions 
    : allPromotions.filter(promo => promo.category.toLowerCase().replace(' ', '-') === selectedCategory);

  const formatDate = (dateString: string) => {
    if (dateString === 'Ongoing') return 'Ongoing';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className={`promotion-screen ${className}`}>
      {/* Hero Section */}
      <section className="promotion-hero">
        <div className="promotion-hero__overlay"></div>
        <div className="promotion-hero__content">
          <div className="promotion-hero__text">
            <Text className="promotion-hero__highlight" color="white">
              {promotionHero.subtitle}
            </Text>
            <Title level="h1" size="xl" color="white" className="promotion-hero__title">
              {promotionHero.title}
            </Title>
          </div>
        </div>
      </section>

      <main className="promotion-screen__main">
        <div className="promotion-screen__container">
          {/* Featured Promotions Section */}
          <section className="featured-promotions-section">
            <div className="featured-promotions__header">
              <div className="featured-promotions__line"></div>
              <Title level="h2" size="md" color="primary" className="featured-promotions__title">
                Featured Promotions
              </Title>
              <div className="featured-promotions__line"></div>
            </div>

            <div className="featured-promotions__grid">
              {featuredPromotions.map((promotion) => (
                <div key={promotion.id} className="featured-promotion-card">
                  <div className="featured-promotion-card__image">
                    <img src={promotion.image} alt={promotion.title} />
                    <div className="featured-promotion-card__badge">
                      <span className="featured-promotion-card__discount">{promotion.discount}</span>
                    </div>
                  </div>
                  
                  <div className="featured-promotion-card__content">
                    <div className="featured-promotion-card__category">
                      <Text variant="span" size="xs" color="secondary">
                        {promotion.category}
                      </Text>
                    </div>
                    
                    <Title level="h3" size="md" color="primary" className="featured-promotion-card__title">
                      {promotion.title}
                    </Title>
                    
                    <Text variant="p" size="sm" color="secondary" className="featured-promotion-card__description">
                      {promotion.description}
                    </Text>
                    
                    <div className="featured-promotion-card__pricing">
                      <div className="featured-promotion-card__price">
                        <Text variant="span" size="sm" color="muted" className="featured-promotion-card__original-price">
                          {promotion.originalPrice}
                        </Text>
                        <Text variant="span" size="lg" color="primary" className="featured-promotion-card__discounted-price">
                          {promotion.discountedPrice}
                        </Text>
                      </div>
                      <div className="featured-promotion-card__shops">
                        <Text variant="span" size="xs" color="secondary">
                          {promotion.participatingShops} shops
                        </Text>
                      </div>
                    </div>
                    
                    <div className="featured-promotion-card__code">
                      <div className="featured-promotion-card__code-label">
                        <Text variant="span" size="xs" color="secondary">
                          Code: {promotion.code}
                        </Text>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyCode(promotion.code)}
                        className="featured-promotion-card__copy-btn"
                      >
                        {copiedCode === promotion.code ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                    
                    <div className="featured-promotion-card__validity">
                      <Text variant="span" size="xs" color="secondary">
                        Valid until: {formatDate(promotion.validUntil)}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Category Filter Section */}
          <section className="category-filter-section">
            <div className="category-filter__header">
              <Title level="h2" size="lg" color="primary" className="category-filter__title">
                Browse by Category
              </Title>
              <Text variant="p" size="md" color="secondary" className="category-filter__subtitle">
                Find promotions that match your preferences
              </Text>
            </div>

            <div className="category-filter__buttons">
              {promotionCategories.map((category) => (
                <button
                  key={category.id}
                  className={`category-filter__button ${selectedCategory === category.id ? 'category-filter__button--active' : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  <span className="category-filter__button-text">{category.label}</span>
                  <span className="category-filter__button-count">({category.count})</span>
                </button>
              ))}
            </div>
          </section>

          {/* All Promotions Section */}
          <section className="all-promotions-section">
            <div className="all-promotions__header">
              <Title level="h2" size="lg" color="primary" className="all-promotions__title">
                All Promotions
              </Title>
              <Text variant="p" size="md" color="secondary" className="all-promotions__subtitle">
                Showing {filteredPromotions.length} promotion{filteredPromotions.length !== 1 ? 's' : ''}
              </Text>
            </div>

            <div className="all-promotions__grid">
              {filteredPromotions.map((promotion) => (
                <div key={promotion.id} className="promotion-card">
                  <div className="promotion-card__image">
                    <img src={promotion.image} alt={promotion.title} />
                    <div className="promotion-card__badge">
                      <span className="promotion-card__discount">{promotion.discount}</span>
                    </div>
                  </div>
                  
                  <div className="promotion-card__content">
                    <div className="promotion-card__category">
                      <Text variant="span" size="xs" color="secondary">
                        {promotion.category}
                      </Text>
                    </div>
                    
                    <Title level="h3" size="sm" color="primary" className="promotion-card__title">
                      {promotion.title}
                    </Title>
                    
                    <Text variant="p" size="xs" color="secondary" className="promotion-card__description">
                      {promotion.description}
                    </Text>
                    
                    <div className="promotion-card__pricing">
                      <div className="promotion-card__price">
                        <Text variant="span" size="xs" color="muted" className="promotion-card__original-price">
                          {promotion.originalPrice}
                        </Text>
                        <Text variant="span" size="md" color="primary" className="promotion-card__discounted-price">
                          {promotion.discountedPrice}
                        </Text>
                      </div>
                    </div>
                    
                    <div className="promotion-card__code">
                      <div className="promotion-card__code-label">
                        <Text variant="span" size="xs" color="secondary">
                          {promotion.code}
                        </Text>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopyCode(promotion.code)}
                        className="promotion-card__copy-btn"
                      >
                        {copiedCode === promotion.code ? 'Copied!' : 'Copy'}
                      </Button>
                    </div>
                    
                    <div className="promotion-card__validity">
                      <Text variant="span" size="xs" color="secondary">
                        Valid until: {formatDate(promotion.validUntil)}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to Use Section */}
          <section className="how-to-use-section">
            <div className="how-to-use__header">
              <Title level="h2" size="xl" color="primary" className="how-to-use__title">
                How to Use Promotions
              </Title>
              <Text variant="p" size="md" color="secondary" className="how-to-use__subtitle">
                Follow these simple steps to redeem your promotions
              </Text>
            </div>

            <div className="how-to-use__steps">
              {howToUse.map((step, index) => (
                <div key={step.step} className="how-to-use__step">
                  <div className="how-to-use__step-number">
                    <span className="how-to-use__step-icon">{step.icon}</span>
                    <div className="how-to-use__step-circle">
                      <span className="how-to-use__step-count">{step.step}</span>
                    </div>
                  </div>
                  
                  <div className="how-to-use__step-content">
                    <Title level="h3" size="md" color="primary" className="how-to-use__step-title">
                      {step.title}
                    </Title>
                    <Text variant="p" size="sm" color="secondary" className="how-to-use__step-description">
                      {step.description}
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Terms and Conditions Section */}
          <section className="terms-section">
            <div className="terms__header">
              <Title level="h2" size="lg" color="primary" className="terms__title">
                Terms & Conditions
              </Title>
              <Text variant="p" size="md" color="secondary" className="terms__subtitle">
                Please read the following terms before using any promotions
              </Text>
            </div>

            <div className="terms__list">
              {termsAndConditions.map((term, index) => (
                <div key={index} className="terms__item">
                  <div className="terms__bullet">•</div>
                  <Text variant="p" size="sm" color="secondary" className="terms__text">
                    {term}
                  </Text>
                </div>
              ))}
          </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PromotionScreen;
