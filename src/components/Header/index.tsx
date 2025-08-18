import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle';
import './index.css';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  
  if (isAuthPage) {
    return null; // Don't show navigation on auth pages
  }
  
  return (
    <header className={`header ${className}`}>
      <div className="header__container">
        <div className="header__logo">
          <Link to="/" className="header__logo-link">
            Home
          </Link>
        </div>
        
        <nav className="header__navigation">
          <div className="header__nav-links">
            <Link to="/login" className="header__nav-link">
              Login
            </Link>
            <Link to="/register" className="header__nav-link">
              Register
            </Link>
          </div>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
