import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MainMenu.css';

interface MainMenuProps {
  className?: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ className = '' }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`main-menu ${className}`}>
      <div className="main-menu__container">
        {/* Location Selector */}
        <div className="main-menu__location">
          <div className="main-menu__location-selector">
            <span className="main-menu__location-text">All Location</span>
            <div className="main-menu__location-chevron-placeholder">
              {/* TODO: Replace with chevron icon */}
              <span>▼</span>
            </div>
            <div className="main-menu__location-icon-placeholder">
              {/* TODO: Replace with location icon */}
              <span>📍</span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="main-menu__navigation">
          <Link 
            to="/" 
            className={`main-menu__nav-link ${isActive('/') ? 'main-menu__nav-link--active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/store" 
            className={`main-menu__nav-link ${isActive('/store') ? 'main-menu__nav-link--active' : ''}`}
          >
            Store
          </Link>
          <Link 
            to="/location" 
            className={`main-menu__nav-link ${isActive('/location') ? 'main-menu__nav-link--active' : ''}`}
          >
            Location
          </Link>
          <Link 
            to="/about" 
            className={`main-menu__nav-link ${isActive('/about') ? 'main-menu__nav-link--active' : ''}`}
          >
            About
          </Link>
          <Link 
            to="/blog" 
            className={`main-menu__nav-link ${isActive('/blog') ? 'main-menu__nav-link--active' : ''}`}
          >
            Blog
          </Link>
          <Link 
            to="/contact" 
            className={`main-menu__nav-link ${isActive('/contact') ? 'main-menu__nav-link--active' : ''}`}
          >
            Contact
          </Link>
          <Link 
            to="/promotion" 
            className={`main-menu__nav-link ${isActive('/promotion') ? 'main-menu__nav-link--active' : ''}`}
          >
            Promotion
          </Link>
        </nav>

        {/* Vendor Button */}
        <div className="main-menu__vendor">
          <button className="main-menu__vendor-button">
            <span className="main-menu__vendor-text">Become a Vendor</span>
            <div className="main-menu__vendor-arrow-placeholder">
              {/* TODO: Replace with arrow icon */}
              <span>→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
