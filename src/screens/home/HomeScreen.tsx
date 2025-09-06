import React, { useState } from 'react';
import { Footer, Title, Text, Button, Input } from '../../components';
import './HomeScreen.css';

// Reusable Components
const StoreCard: React.FC<{ 
  store: any; 
  onViewDetails: (storeId: number) => void;
}> = ({ store, onViewDetails }) => {
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
          <button className="wishlist-btn">
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

const TestimonialCard: React.FC<{ testimonial: any }> = ({ testimonial }) => {
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
    <div className="testimonial-card">
      <div className="testimonial-content">
        <div className="testimonial-quote">
          <Text variant="p" size="sm" color="secondary">
            "{testimonial.text}"
          </Text>
        </div>
        <div className="testimonial-author">
          <Text variant="p" size="sm" color="primary" className="author-name">
            {testimonial.name}
          </Text>
          <Text variant="p" size="sm" color="secondary" className="author-time">
            {testimonial.timeAgo}
          </Text>
        </div>
        <div className="testimonial-title">
          <Text variant="p" size="sm" color="primary">
            {testimonial.title}
          </Text>
        </div>
        <div className="testimonial-rating">
          {renderStars(testimonial.rating)}
        </div>
      </div>
      <div className="testimonial-avatar">
        <img src={testimonial.avatar} alt={testimonial.name} />
      </div>
    </div>
  );
};

const HomeScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample data
  const heroImages = [
    '/api/placeholder/1920/1080',
    '/api/placeholder/1920/1080',
    '/api/placeholder/1920/1080',
    '/api/placeholder/1920/1080',
    '/api/placeholder/1920/1080'
  ];

  const testimonials = [
    {
      id: 1,
      name: "Mrs Catherine White",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      timeAgo: "44 Hours Ago",
      title: "As good as advertised",
      rating: 4,
      avatar: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Mrs Catherine White",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      timeAgo: "44 Hours Ago",
      title: "As good as advertised",
      rating: 4,
      avatar: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Mrs Catherine White",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
      timeAgo: "44 Hours Ago",
      title: "As good as advertised",
      rating: 4,
      avatar: "/api/placeholder/80/80"
    }
  ];

  const allCoffees = [
    {
      id: 1,
      name: "Sumatra mandheling",
      image: "/api/placeholder/305/288",
      hours: "9:00AM - 10:00PM",
      priceRange: "$18.50 – $87.50",
      distance: "3.5 Km",
      rating: 4
    },
    {
      id: 2,
      name: "Sumatra mandheling",
      image: "/api/placeholder/305/288",
      hours: "9:00AM - 10:00PM",
      priceRange: "$18.50 – $87.50",
      distance: "3.5 Km",
      rating: 4
    },
    {
      id: 3,
      name: "Sumatra mandheling",
      image: "/api/placeholder/305/288",
      hours: "9:00AM - 10:00PM",
      priceRange: "$18.50 – $87.50",
      distance: "3.5 Km",
      rating: 4
    },
    {
      id: 4,
      name: "Sumatra mandheling",
      image: "/api/placeholder/305/288",
      hours: "9:00AM - 10:00PM",
      priceRange: "$18.50 – $87.50",
      distance: "3.5 Km",
      rating: 4
    }
  ];

  const nearbyCoffees = [
    {
      id: 1,
      name: "Sumatra mandheling",
      image: "/api/placeholder/305/288",
      hours: "9:00AM - 10:00PM",
      priceRange: "$18.50 – $87.50",
      distance: "2.5 Km",
      rating: 4
    },
    {
      id: 2,
      name: "Sumatra mandheling",
      image: "/api/placeholder/305/288",
      hours: "9:00AM - 10:00PM",
      priceRange: "$18.50 – $87.50",
      distance: "2.5 Km",
      rating: 4
    },
    {
      id: 3,
      name: "Sumatra mandheling",
      image: "/api/placeholder/305/288",
      hours: "9:00AM - 10:00PM",
      priceRange: "$18.50 – $87.50",
      distance: "2.5 Km",
      rating: 4
    },
    {
      id: 4,
      name: "Sumatra mandheling",
      image: "/api/placeholder/305/288",
      hours: "9:00AM - 10:00PM",
      priceRange: "$18.50 – $87.50",
      distance: "2.5 Km",
      rating: 4
    },
    {
      id: 5,
      name: "Sumatra mandheling",
      image: "/api/placeholder/305/288",
      hours: "9:00AM - 10:00PM",
      priceRange: "$18.50 – $87.50",
      distance: "0.5 Km",
      rating: 4
    },
    {
      id: 6,
      name: "Sumatra mandheling",
      image: "/api/placeholder/305/288",
      hours: "9:00AM - 10:00PM",
      priceRange: "$18.50 – $87.50",
      distance: "1.5 Km",
      rating: 4
    }
  ];

  const handleViewStoreDetail = (storeId: number) => {
    console.log('View store details:', storeId);
    // Navigate to store detail page
  };

  return (
    <div className="home-container">
      {/* Hero Section with Image Slider */}
      <section className="hero-section">
        <div className="hero-slider">
          <div className="hero-images">
            {heroImages.map((image, index) => (
              <div 
                key={index} 
                className={`hero-image ${index === currentSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
          </div>
          
          <div className="hero-search">
            <div className="search-slogan">
              <Text variant="p" size="md" color="white" className="highlight-text">
                Hightlight news, ads, discount, HOT HOT
              </Text>
              <Title level="h1" size="xl" color="white">
                Find the café, feel the vibe
              </Title>
            </div>
            <div className="search-form">
              <div className="search-input-container">
                <Input 
                  type="text" 
                  placeholder="Enter your location"
                  className="search-input"
                />
                <Button variant="primary" size="lg" className="search-button">
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="slider-controls">
            <div className="slider-dots">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
            <div className="slider-arrows">
              <button 
                className="slider-arrow left"
                onClick={() => setCurrentSlide((prev) => prev > 0 ? prev - 1 : heroImages.length - 1)}
              >
                ‹
              </button>
              <button 
                className="slider-arrow right"
                onClick={() => setCurrentSlide((prev) => prev < heroImages.length - 1 ? prev + 1 : 0)}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-background">
          <img src="/api/placeholder/1441/609" alt="Coffee background" />
        </div>
        <div className="testimonials-content">
          <div className="testimonials-header">
            <div className="testimonials-line"></div>
            <Title level="h2" size="lg" color="white" className="testimonials-title">
              What our Customers
            </Title>
            <div className="testimonials-line"></div>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* All Coffees Section */}
      <section className="all-coffees-section">
        <div className="section-background"></div>
        <div className="section-content">
          <Title level="h2" size="xl" color="primary" className="section-title">
            All Coffees
          </Title>
          <div className="coffees-grid">
            {allCoffees.map((coffee) => (
              <StoreCard key={coffee.id} store={coffee} onViewDetails={handleViewStoreDetail} />
            ))}
          </div>
          <div className="pagination-dots">
            {Array.from({ length: 7 }, (_, i) => (
              <button key={i} className={`pagination-dot ${i === 0 ? 'active' : ''}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Coffees Nearby Section */}
      <section className="coffees-nearby-section">
        <div className="section-background"></div>
        <div className="section-content">
          <Title level="h2" size="xl" color="primary" className="section-title">
            Coffees nearby
          </Title>
          <div className="coffees-grid">
            {nearbyCoffees.map((coffee) => (
              <StoreCard key={coffee.id} store={coffee} onViewDetails={handleViewStoreDetail} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-background">
          <img src="/api/placeholder/1441/374" alt="Newsletter background" />
        </div>
        <div className="newsletter-content">
          <div className="newsletter-text">
            <Title level="h2" size="xl" color="white" className="newsletter-title">
              Subscribe to get the Latest News
            </Title>
            <Text variant="p" size="md" color="white" className="newsletter-subtitle">
              Don't miss out on our latest news, updates, tips and special offers
            </Text>
          </div>
          <div className="newsletter-form">
            <div className="form-container">
              <Input 
                type="email" 
                placeholder="Enter your mail"
                className="newsletter-input"
              />
              <Button variant="primary" size="lg" className="newsletter-button">
                Suscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomeScreen;
