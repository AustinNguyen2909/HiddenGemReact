import React, { useState, useEffect } from 'react';
import { Footer, Title, Text, Button, Input } from '../../components';
import { bannersService } from '../../services/banners';
import { Banner } from '../../services/types';
import './HomeScreen.css';
import HomeStory from "../../assets/images/home-story.png";
import HomeReview from "../../assets/images/home-review.png";
import HomeNewsletter from "../../assets/images/home-newsletter.png";

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
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoadingBanners, setIsLoadingBanners] = useState(true);
  const [bannerError, setBannerError] = useState<string | null>(null);

  // Fetch banners on component mount
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoadingBanners(true);
        setBannerError(null);
        const response = await bannersService.list({ vi_tri: 'Home', active: 1 });
        console.log('bannersService', response.data);
        setBanners(response.data);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setBannerError('Failed to load hero images');
        // Fallback to placeholder images
        setBanners([]);
      } finally {
        setIsLoadingBanners(false);
      }
    };

    fetchBanners();
  }, []);

  // Get hero images from banners, sorted by thu_tu (order)
  const heroImages = banners
    .sort((a, b) => a.thu_tu - b.thu_tu)
    .map(banner => banner.link_url);

  const hiddenGemsStory = {
    id: 1,
    name: "Jonny Thomas",
    role: "Project Manager",
    text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset.....",
    timeAgo: "Old story",
    avatar: "/api/placeholder/80/80"
  };

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
            {isLoadingBanners ? (
              <div className="hero-image active loading">
                <div className="loading-spinner">
                  <Text variant="p" size="md" color="white">Loading...</Text>
                </div>
              </div>
            ) : heroImages.length > 0 ? (
              heroImages.map((image, index) => (
                <img 
                  key={index} 
                  src={image}
                  alt={`Hero banner ${index + 1}`}
                  className={`hero-image ${index === currentSlide ? 'active' : ''}`}
                />
              ))
            ) : (
              <div className="hero-image active error">
                <div className="error-message">
                  <Text variant="p" size="md" color="white">
                    {bannerError || 'No hero images available'}
                  </Text>
                </div>
              </div>
            )}
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

          {/* Slider Controls - only show if we have images and not loading */}
          {!isLoadingBanners && heroImages.length > 1 && (
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
          )}
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

      {/* What our Customers Section */}
      <section className="customers-section">
        <div className="customers-background">
          <img src={HomeReview} alt="Coffee background" />
        </div>
        <div className="customers-content">
          <div className="customers-header">
            <div className="customers-line"></div>
            <Title level="h2" size="lg" color="white" className="customers-title">
              What our Customers
            </Title>
            <div className="customers-line"></div>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Hidden Gems Stories Section */}
      <section className="hidden-gems-stories-section">
        <div className="stories-background">
          <img src={HomeStory} alt="Coffee background" />
        </div>
        <div className="stories-content">
          <div className="stories-header">
            <Title level="h2" size="lg" color="primary" className="stories-title">
              Hidden Gems Stories
            </Title>
            <Text variant="p" size="md" color="secondary" className="stories-subtitle">
              Our customers has amazing things to say about us
            </Text>
          </div>
          
          <div className="story-card">
            <div className="story-content">
              <div className="story-quote">
                <Text variant="p" size="lg" color="primary">
                  "
                </Text>
              </div>
              <Text variant="p" size="md" color="secondary" className="story-text">
                {hiddenGemsStory.text}
              </Text>
              <div className="story-author">
                <Text variant="p" size="lg" color="primary" className="author-name">
                  {hiddenGemsStory.name}
                </Text>
                <Text variant="p" size="md" color="secondary" className="author-role">
                  {hiddenGemsStory.role}
                </Text>
                <Text variant="p" size="sm" color="secondary" className="story-time">
                  {hiddenGemsStory.timeAgo}
                </Text>
              </div>
            </div>
            <div className="story-avatar">
              <img src={hiddenGemsStory.avatar} alt={hiddenGemsStory.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-background">
          <img src={HomeNewsletter} alt="Newsletter background" />
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
