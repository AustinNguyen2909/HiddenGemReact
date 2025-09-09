import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { useAuth } from "../AuthProvider";
import "./MainMenu.css";

interface MainMenuProps {
  className?: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleUserIconClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={`main-menu ${className}`}>
      <div className="main-menu__container">
        {/* Logo Section */}
        <div className="main-menu__logo">
          <Link to="/" className="main-menu__logo-link">
            <div className="main-menu__logo-image">
              {/* TODO: Replace with actual logo image */}
              <div className="main-menu__logo-placeholder">
                <span>LOGO</span>
              </div>
            </div>
            <div className="main-menu__logo-text">
              <span className="main-menu__brand-name">H I D D E N G E M S</span>
            </div>
          </Link>
        </div>

        {/* Search Section */}
        <div className="main-menu__search">
          <div className="main-menu__search-container">
            <div className="main-menu__search-input-group">
              <input
                type="text"
                placeholder="Search ..."
                className="main-menu__search-input"
              />
              <div className="main-menu__search-categories">
                <span className="main-menu__search-category-text">
                  All Topic
                </span>
                <div className="main-menu__search-chevron-placeholder">
                  {/* TODO: Replace with chevron icon */}
                  <span>▼</span>
                </div>
              </div>
            </div>
            <Button 
              size="sm"
              className="main-menu__search-button"
            >
              Search
            </Button>
          </div>
        </div>

        {/* User Actions */}
        <div className="main-menu__actions">
          <div className="main-menu__action-item">
            <div className="main-menu__action-icon">
              {/* TODO: Replace with location icon */}
              <div className="main-menu__icon-placeholder main-menu__icon-placeholder--location">
                <span>📍</span>
              </div>
              <div className="main-menu__notification-badge">2</div>
            </div>
          </div>

          <div className="main-menu__action-item">
            <div className="main-menu__action-icon">
              {/* TODO: Replace with notification icon */}
              <div className="main-menu__icon-placeholder main-menu__icon-placeholder--notification">
                <span>🔔</span>
              </div>
              <div className="main-menu__notification-badge">1</div>
            </div>
          </div>

          <div className="main-menu__action-item">
            <div 
              className="main-menu__action-icon main-menu__action-icon--user"
              onClick={handleUserIconClick}
            >
              {/* TODO: Replace with user icon */}
              <div className="main-menu__icon-placeholder main-menu__icon-placeholder--user">
                <span>👤</span>
              </div>
              {isAuthenticated && user?.username && (
                <div className="main-menu__user-name">
                  {user.username}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
