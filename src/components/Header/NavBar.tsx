import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

interface NavBarProps {
  className?: string;
}

const NavBar: React.FC<NavBarProps> = ({ className = '' }) => {
  return (
    <div className={`nav-bar ${className}`}>
      <div className="nav-bar__container">
        {/* Logo Section */}
        <div className="nav-bar__logo">
          <Link to="/" className="nav-bar__logo-link">
            <div className="nav-bar__logo-image">
              {/* TODO: Replace with actual logo image */}
              <div className="nav-bar__logo-placeholder">
                <span>LOGO</span>
              </div>
            </div>
            <div className="nav-bar__logo-text">
              <span className="nav-bar__brand-name">H I D D E N   G E M S</span>
            </div>
          </Link>
        </div>

        {/* Search Section */}
        <div className="nav-bar__search">
          <div className="nav-bar__search-container">
            <div className="nav-bar__search-input-group">
              <input 
                type="text" 
                placeholder="Search ..." 
                className="nav-bar__search-input"
              />
                          <div className="nav-bar__search-categories">
              <span className="nav-bar__search-category-text">All Topic</span>
              <div className="nav-bar__search-chevron-placeholder">
                {/* TODO: Replace with chevron icon */}
                <span>▼</span>
              </div>
            </div>
            </div>
            <button className="nav-bar__search-button">
              <span className="nav-bar__search-button-text">Search</span>
            </button>
          </div>
        </div>

        {/* User Actions */}
        <div className="nav-bar__actions">
          <div className="nav-bar__action-item">
            <div className="nav-bar__action-icon">
              {/* TODO: Replace with location icon */}
              <div className="nav-bar__icon-placeholder nav-bar__icon-placeholder--location">
                <span>📍</span>
              </div>
              <div className="nav-bar__notification-badge">2</div>
            </div>
          </div>
          
          <div className="nav-bar__action-item">
            <div className="nav-bar__action-icon">
              {/* TODO: Replace with notification icon */}
              <div className="nav-bar__icon-placeholder nav-bar__icon-placeholder--notification">
                <span>🔔</span>
              </div>
              <div className="nav-bar__notification-badge">1</div>
            </div>
          </div>
          
          <div className="nav-bar__action-item">
            <div className="nav-bar__action-icon">
              {/* TODO: Replace with user icon */}
              <div className="nav-bar__icon-placeholder nav-bar__icon-placeholder--user">
                <span>👤</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
