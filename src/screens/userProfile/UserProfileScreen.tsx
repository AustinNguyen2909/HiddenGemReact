import React from 'react';
import { Footer } from '../../components';
import './UserProfileScreen.css';

interface UserProfileScreenProps {
  className?: string;
}

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ className = '' }) => {

  // Sample data for the profile sections
  const profileData = {
    name: "I am Cat, 21",
    bio: "So be careful, the snobbish cat",
    lookingFor: ["Guy", "Pink", "from 21 to 30", "Friendship", "Windy and Flowery"],
    locationPreference: "Quiet place and relaxing mind",
    favoriteCoffeeShops: [
      { id: 1, image: "/api/placeholder/88/96", name: "Coffee Shop 1" },
      { id: 2, image: "/api/placeholder/88/96", name: "Coffee Shop 2" },
      { id: 3, image: "/api/placeholder/88/96", name: "Coffee Shop 3" },
      { id: 4, image: "/api/placeholder/88/96", name: "Coffee Shop 4" },
      { id: 5, image: "/api/placeholder/88/96", name: "Coffee Shop 5" },
      { id: 6, image: "/api/placeholder/88/96", name: "Coffee Shop 6" },
      { id: 7, image: "/api/placeholder/88/96", name: "Coffee Shop 7" },
      { id: 8, image: "/api/placeholder/88/96", name: "Coffee Shop 8" },
      { id: 9, image: "/api/placeholder/88/96", name: "Coffee Shop 9" }
    ],
    reviewPhotos: [
      { id: 1, image: "/api/placeholder/88/96", count: 12 },
      { id: 2, image: "/api/placeholder/88/96", count: 12 },
      { id: 3, image: "/api/placeholder/88/96", count: 12 },
      { id: 4, image: "/api/placeholder/88/96", count: 1 }
    ],
    interests: [
      "Journeys", "Snowboarding", "Design", "Video games", "Cross stitc", "Foreign languages", "Dances",
      "Watching horror movies", "Detectives", "Game of thrones", "Evening walks"
    ],
    personalInfo: {
      appearance: "188 cm, 91 kg, athletic build, brown hair and brown eyes",
      relationships: "Free",
      children: "No, and I'm looking without children",
      education: "Higher",
      smoking: "Against smoking",
      alcohol: "I don't drink, but I don't mind",
      languages: "Russian (native); English (initial)",
      pets: "Cat"
    }
  };

  return (
    <div className={`user-profile-screen ${className}`}>
      <main className="profile-main">
        <div className="profile-container">
          {/* Avatar Section */}
          <div className="avatar-section">
            <div className="avatar-card">
              <div className="avatar-image">
                <img src="/api/placeholder/264/264" alt="Profile" />
              </div>
              <div className="avatar-actions">
                <button className="become-vendor-btn">
                  <span className="close-icon">×</span>
                  Become a Vendor
                </button>
                <div className="divider"></div>
                <button className="change-password-btn">
                  <span className="warning-icon">⚠</span>
                  Change Password
                </button>
              </div>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="profile-info-section">
            <div className="profile-header">
              <h1 className="profile-name">{profileData.name}</h1>
              <button className="edit-btn">Edit</button>
            </div>
            <p className="profile-bio">{profileData.bio}</p>
            <div className="divider"></div>
          </div>

          {/* Looking For Section */}
          <div className="preferences-section">
            <div className="preference-card">
              <h3 className="preference-title">I'm looking for</h3>
              <div className="preference-tags">
                {profileData.lookingFor.map((item, index) => (
                  <span key={index} className="preference-tag">{item}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Location Preference Section */}
          <div className="preferences-section">
            <div className="preference-card">
              <h3 className="preference-title">Where do I want to find</h3>
              <p className="preference-text">{profileData.locationPreference}</p>
            </div>
          </div>

          {/* Favorite Coffee Shops Section */}
          <div className="photos-section">
            <div className="photos-header">
              <div className="photos-title-group">
                <h3 className="photos-title">Favorite coffee shop</h3>
                <span className="photos-count">6</span>
              </div>
              <button className="view-detail-btn">View Detail</button>
            </div>
            <div className="photos-grid">
              {profileData.favoriteCoffeeShops.map((shop) => (
                <div key={shop.id} className="photo-item">
                  <img src={shop.image} alt={shop.name} />
                </div>
              ))}
            </div>
          </div>

          {/* Review Coffee Shops Section */}
          <div className="photos-section">
            <div className="photos-header">
              <div className="photos-title-group">
                <h3 className="photos-title">Review coffee shop</h3>
                <span className="photos-count">37</span>
              </div>
              <button className="view-detail-btn">View Detail</button>
            </div>
            <div className="photos-grid">
              {profileData.reviewPhotos.map((photo) => (
                <div key={photo.id} className="photo-item review-photo">
                  <img src={photo.image} alt="Review" />
                  <div className="photo-overlay">
                    <span className="photo-count">{photo.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interests Section */}
          <div className="interests-section">
            <h3 className="interests-title">Interests</h3>
            <div className="interests-tags">
              {profileData.interests.map((interest, index) => (
                <span key={index} className="interest-tag">{interest}</span>
              ))}
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="personal-info-section">
            <h3 className="personal-info-title">Personal information</h3>
            <div className="personal-info-list">
              <div className="info-item">
                <span className="info-label">Appearance:</span>
                <span className="info-value">{profileData.personalInfo.appearance}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Relationships:</span>
                <span className="info-value">{profileData.personalInfo.relationships}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Children:</span>
                <span className="info-value">{profileData.personalInfo.children}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Education:</span>
                <span className="info-value">{profileData.personalInfo.education}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Smoking:</span>
                <span className="info-value">{profileData.personalInfo.smoking}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Alcohol:</span>
                <span className="info-value">{profileData.personalInfo.alcohol}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Foreign languages:</span>
                <span className="info-value">{profileData.personalInfo.languages}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Pets:</span>
                <span className="info-value">{profileData.personalInfo.pets}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfileScreen;