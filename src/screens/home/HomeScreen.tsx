import React from 'react';
import { Footer, Title, Text, Button, Input, ProductCard, InfoCard, LocationItem } from '../../components';
import { 
  heroContent, 
  featuredProducts, 
  aboutContent, 
  services, 
  testimonials, 
  locationInfo, 
  newsletterContent 
} from '../../dummyData';
import './HomeScreen.css';


const HomeScreen: React.FC = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <Title level="h1" size="xl" color="white" align="center">
            {heroContent.title}
          </Title>
          <Text variant="p" size="lg" color="white" align="center" className="hero-subtitle">
            {heroContent.subtitle}
          </Text>
          <div className="hero-actions">
            <Button variant="primary" size="lg">
              {heroContent.primaryButton}
            </Button>
            <Button variant="secondary" size="lg">
              {heroContent.secondaryButton}
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <div className="section-container">
          <Title level="h2" size="xl" align="center" color="primary">
            Featured Products
          </Title>
          <Text variant="p" size="md" align="center" color="secondary" className="section-subtitle">
            Discover our most popular coffee blends and treats
          </Text>
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                variant="featured"
                showRating={false}
                showQuickView={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <div className="section-container">
          <div className="about-content">
            <div className="about-text">
              <Title level="h2" size="xl" color="primary">
                {aboutContent.title}
              </Title>
              <Text variant="p" size="md" color="secondary">
                {aboutContent.description1}
              </Text>
              <Text variant="p" size="md" color="secondary">
                {aboutContent.description2}
              </Text>
              <Button variant="primary" size="md">
                {aboutContent.buttonText}
              </Button>
            </div>
            <div className="about-image-placeholder">
              <Text variant="p" size="md" color="secondary" align="center">
                {aboutContent.imagePlaceholder}
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-container">
          <Title level="h2" size="xl" align="center" color="primary">
            Our Services
          </Title>
          <Text variant="p" size="md" align="center" color="secondary" className="section-subtitle">
            Everything you need for the perfect coffee experience
          </Text>
          <div className="services-grid">
            {services.map((service) => (
              <InfoCard 
                key={service.id} 
                title={service.title}
                description={service.description}
                icon="Icon"
                variant="service"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-container">
          <Title level="h2" size="xl" align="center" color="primary">
            What Our Customers Say
          </Title>
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <InfoCard 
                key={testimonial.id} 
                title={testimonial.name}
                description={testimonial.text}
                variant="testimonial"
                author={testimonial.name}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours Section */}
      <section className="location-section">
        <div className="section-container">
          <div className="location-content">
            <div className="location-info">
              <Title level="h2" size="xl" color="primary">
                Visit Us
              </Title>
              <div className="location-details">
                <LocationItem title="Address" content={locationInfo.address} />
                <LocationItem title="Hours" content={locationInfo.hours} />
                <LocationItem title="Contact" content={locationInfo.contact} />
              </div>
            </div>
            <div className="location-map-placeholder">
              <Text variant="p" size="md" color="secondary" align="center">
                Map Placeholder
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="section-container">
          <Title level="h2" size="xl" align="center" color="white">
            {newsletterContent.title}
          </Title>
          <Text variant="p" size="md" align="center" color="white" className="newsletter-subtitle">
            {newsletterContent.subtitle}
          </Text>
          <div className="newsletter-form">
            <Input 
              type="email" 
              placeholder={newsletterContent.placeholder}
              className="newsletter-input"
            />
            <Button variant="primary" size="lg">
              {newsletterContent.buttonText}
            </Button>
          </div>
        </div>
      </section>

      <div className="home-footer">
        <Footer />
      </div>
    </div>
  );
};

export default HomeScreen;
