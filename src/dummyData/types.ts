// Shared TypeScript interfaces for dummy data

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  image: string;
  description?: string;
  brand?: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  icon?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating?: number;
  location?: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export interface LocationInfo {
  address: string;
  hours: string;
  contact: string;
}

export interface FilterOption {
  id: string;
  label: string;
  value: string | number;
  count?: number;
}

export interface FilterGroup {
  id: string;
  title: string;
  type: 'checkbox' | 'range' | 'select';
  options: FilterOption[];
}

export interface HeroContent {
  title: string;
  subtitle: string;
  searchPlaceholder?: string;
  primaryButton: string;
  secondaryButton: string;
  backgroundImage?: string;
}
