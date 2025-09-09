import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import "./TopSettings.css";

interface TopSettingsProps {
  className?: string;
}

const TopSettings: React.FC<TopSettingsProps> = ({ className = "" }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleAccountClick = () => {
    if (isAuthenticated) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={`top-settings ${className}`}>
      <div className="top-settings__container">
        <div className="top-settings__left">
          <div className="top-settings__help">
            <span 
              className="top-settings__help-text top-settings__account"
              onClick={handleAccountClick}
            >
              {isAuthenticated ? (user?.username || 'Account') : 'Account'}
            </span>
            <span className="top-settings__help-text">Track Order</span>
            <span className="top-settings__help-text">Support</span>
            {isAuthenticated && (
              <span 
                className="top-settings__help-text top-settings__logout"
                onClick={handleLogout}
              >
                Logout
              </span>
            )}
          </div>
        </div>

        <div className="top-settings__right">
          <div className="top-settings__selector">
            <span className="top-settings__label">United State</span>
            <div className="top-settings__chevron-placeholder">
              {/* TODO: Replace with chevron icon */}
              <span>▼</span>
            </div>
          </div>

          <div className="top-settings__selector">
            <span className="top-settings__label">USD</span>
            <div className="top-settings__chevron-placeholder">
              {/* TODO: Replace with chevron icon */}
              <span>▼</span>
            </div>
          </div>

          <div className="top-settings__selector">
            <span className="top-settings__label">English</span>
            <div className="top-settings__chevron-placeholder">
              {/* TODO: Replace with chevron icon */}
              <span>▼</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSettings;
