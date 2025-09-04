import React from 'react';
import { HeroCarousel, CoffeeListCarousel, TestimonialCarousel, HiddenGemsStoriesCarousel } from './index';

// Example data for Hero Carousel
const heroSlides = [
  {
    id: '1',
    image: '', // No image - will show gray placeholder
    title: 'Find the café, feel the vibe',
    subtitle: 'Highlight news, ads, discount, HOT HOT'
  },
  {
    id: '2',
    image: '', // No image - will show gray placeholder
    title: 'Discover Hidden Gems',
    subtitle: 'Explore the best coffee shops in your area'
  },
  {
    id: '3',
    image: '', // No image - will show gray placeholder
    title: 'Premium Coffee Experience',
    subtitle: 'From bean to cup, we bring you the finest'
  }
];

// Example data for Coffee List Carousel
const coffeeShops = [
  {
    id: '1',
    name: 'SUMATRA MANDHELING',
    image: '', // No image - will show gray placeholder
    distance: '3.5 Km',
    rating: 4.5,
    uptime: '9:00AM - 10:00PM',
    priceRange: '$18.50 - $87.50',
    location: 'Downtown'
  },
  {
    id: '2',
    name: 'ETHIOPIAN YIRGACHEFFE',
    image: '', // No image - will show gray placeholder
    distance: '2.1 Km',
    rating: 4.8,
    uptime: '7:00AM - 9:00PM',
    priceRange: '$15.00 - $75.00',
    location: 'Midtown'
  },
  {
    id: '3',
    name: 'COLOMBIAN SUPREMO',
    image: '', // No image - will show gray placeholder
    distance: '4.2 Km',
    rating: 4.3,
    uptime: '8:00AM - 11:00PM',
    priceRange: '$20.00 - $90.00',
    location: 'Uptown'
  },
  {
    id: '4',
    name: 'JAMAICAN BLUE MOUNTAIN',
    image: '', // No image - will show gray placeholder
    distance: '1.8 Km',
    rating: 5.0,
    uptime: '6:00AM - 10:00PM',
    priceRange: '$25.00 - $120.00',
    location: 'Waterfront'
  }
];

// Example data for Testimonial Carousel
const testimonials = [
  {
    id: '1',
    name: 'Mrs Catherine White',
    avatar: '', // No image - will show initials placeholder
    rating: 5,
    headline: 'As good as advertised',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    timeAgo: '44 Hours Ago'
  },
  {
    id: '2',
    name: 'Mr John Smith',
    avatar: '', // No image - will show initials placeholder
    rating: 5,
    headline: 'Exceptional quality',
    quote: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    timeAgo: '2 Days Ago'
  },
  {
    id: '3',
    name: 'Ms Sarah Johnson',
    avatar: '', // No image - will show initials placeholder
    rating: 5,
    headline: 'Perfect coffee experience',
    quote: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    timeAgo: '1 Week Ago'
  }
];

// Example data for Hidden Gems Stories Carousel
const stories = [
  {
    id: '1',
    quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    authorName: 'Jonny Thomas',
    authorRole: 'Project Manager',
    avatar: '' // No image - will show initials placeholder
  },
  {
    id: '2',
    quote: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.',
    authorName: 'Sarah Wilson',
    authorRole: 'Coffee Enthusiast',
    avatar: '' // No image - will show initials placeholder
  },
  {
    id: '3',
    quote: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto.',
    authorName: 'Michael Chen',
    authorRole: 'Cafe Owner',
    avatar: '' // No image - will show initials placeholder
  }
];

const CarouselExamples: React.FC = () => {
  return (
    <div>
      {/* Hero Carousel Example */}
      <HeroCarousel slides={heroSlides} />
      
      {/* Coffee List Carousel Example */}
      <CoffeeListCarousel 
        title="ALL COFFEES"
        shops={coffeeShops}
      />
      
      {/* Testimonial Carousel Example */}
      <TestimonialCarousel 
        title="What our Customers"
        testimonials={testimonials}
        backgroundImage="" // No background image - will show gray placeholder
      />
      
      {/* Hidden Gems Stories Carousel Example */}
      <HiddenGemsStoriesCarousel 
        title="Hidden Gems Stories"
        subtitle="Our customers has amazing things to say about us"
        stories={stories}
        backgroundColor="#FFFFFF"
      />
    </div>
  );
};

export default CarouselExamples;
