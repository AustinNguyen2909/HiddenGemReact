import React from 'react';
import { Footer, Title, Text, Card, Button, Input } from '../../components';
import './HomeScreen.css';

const HomeScreen: React.FC = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <Title level="h1" size="xl" color="white" align="center">
            Welcome to Our Coffee Shop
          </Title>
          <Text variant="p" size="lg" color="white" align="center" className="hero-subtitle">
            Experience the finest coffee and cozy atmosphere
          </Text>
          <div className="hero-actions">
            <Button variant="primary" size="lg">
              Order Now
            </Button>
            <Button variant="secondary" size="lg">
              View Menu
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
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} variant="elevated" padding="lg" shadow="md" hover className="product-card">
                <div className="product-image-placeholder">
                  <Text variant="p" size="sm" color="secondary">Product Image</Text>
                </div>
                <Title level="h3" size="lg" color="primary">
                  Coffee Blend {item}
                </Title>
                <Text variant="p" size="md" color="secondary">
                  Rich and aromatic coffee blend
                </Text>
                <Text variant="p" size="lg" weight="semibold" color="accent">
                  $12.99
                </Text>
                <Button variant="primary" size="sm" className="product-button">
                  Add to Cart
                </Button>
              </Card>
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
                About Our Coffee Shop
              </Title>
              <Text variant="p" size="md" color="secondary">
                We are passionate about bringing you the finest coffee experience. 
                Our beans are carefully selected from the best coffee regions around the world, 
                and our skilled baristas craft each cup with love and attention to detail.
              </Text>
              <Text variant="p" size="md" color="secondary">
                Since 2010, we have been serving our community with exceptional coffee, 
                delicious pastries, and a warm, welcoming atmosphere that makes you feel at home.
              </Text>
              <Button variant="primary" size="md">
                Learn More
              </Button>
            </div>
            <div className="about-image-placeholder">
              <Text variant="p" size="md" color="secondary" align="center">
                About Us Image
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
            {[
              { title: 'Fresh Coffee', description: 'Daily roasted beans' },
              { title: 'Pastries', description: 'Homemade baked goods' },
              { title: 'WiFi', description: 'Free internet access' },
              { title: 'Events', description: 'Private party hosting' }
            ].map((service, index) => (
              <Card key={index} variant="elevated" padding="lg" shadow="sm" className="service-card">
                <div className="service-icon-placeholder">
                  <Text variant="p" size="sm" color="secondary">Icon</Text>
                </div>
                <Title level="h3" size="md" color="primary" align="center">
                  {service.title}
                </Title>
                <Text variant="p" size="sm" color="secondary" align="center">
                  {service.description}
                </Text>
              </Card>
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
            {[
              { name: 'Sarah Johnson', text: 'Best coffee in town! The atmosphere is perfect for working.' },
              { name: 'Mike Chen', text: 'Amazing pastries and friendly staff. Highly recommended!' },
              { name: 'Emily Davis', text: 'Love the cozy vibe and the coffee is always perfect.' }
            ].map((testimonial, index) => (
              <Card key={index} variant="elevated" padding="lg" shadow="sm" className="testimonial-card">
                <Text variant="p" size="md" color="secondary" className="testimonial-text">
                  "{testimonial.text}"
                </Text>
                <Text variant="p" size="sm" weight="semibold" color="primary" className="testimonial-author">
                  - {testimonial.name}
                </Text>
              </Card>
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
                <div className="location-item">
                  <Title level="h3" size="md" color="primary">Address</Title>
                  <Text variant="p" size="md" color="secondary">
                    123 Coffee Street<br />
                    Downtown District<br />
                    City, State 12345
                  </Text>
                </div>
                <div className="location-item">
                  <Title level="h3" size="md" color="primary">Hours</Title>
                  <Text variant="p" size="md" color="secondary">
                    Monday - Friday: 6:00 AM - 8:00 PM<br />
                    Saturday - Sunday: 7:00 AM - 9:00 PM
                  </Text>
                </div>
                <div className="location-item">
                  <Title level="h3" size="md" color="primary">Contact</Title>
                  <Text variant="p" size="md" color="secondary">
                    Phone: (555) 123-4567<br />
                    Email: info@coffeeshop.com
                  </Text>
                </div>
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
            Stay Updated
          </Title>
          <Text variant="p" size="md" align="center" color="white" className="newsletter-subtitle">
            Subscribe to our newsletter for special offers and updates
          </Text>
          <div className="newsletter-form">
            <Input 
              type="email" 
              placeholder="Enter your email address"
              className="newsletter-input"
            />
            <Button variant="primary" size="lg">
              Subscribe
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
