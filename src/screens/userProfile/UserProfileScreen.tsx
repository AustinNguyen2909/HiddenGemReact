import React, { useState, useEffect } from 'react';
import { Button, Footer, ProfileEditModal } from '../../components';
import { meService, UserProfile } from '../../services/me';
import './UserProfileScreen.css';

interface UserProfileScreenProps {
  className?: string;
}

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ className = '' }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  console.log('userProfile', userProfile)

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const profile = await meService.getProfile();
      setUserProfile(profile.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch user profile:', err);
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile data
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleProfileUpdated = () => {
    fetchUserProfile();
  };

  // Sample data for other sections (to be updated later)
  const profileData = {
    name: "I am Cat, 21",
    bio: "So be careful, the snobbish cat",
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
  };

  // Loading state
  if (loading) {
    return (
      <div className={`user-profile-screen ${className}`}>
        <main className="profile-main">
          <div className="profile-container">
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Loading profile...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`user-profile-screen ${className}`}>
        <main className="profile-main">
          <div className="profile-container">
            <div className="error-container">
              <p>Error: {error}</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`user-profile-screen ${className}`}>
      <main className="profile-main">
        <div className="profile-container">
          {/* Avatar Section */}
          <div className="avatar-section">
            <div className="avatar-card">
              <div className="avatar-image">
                <img src={'https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png'} alt="Profile" />
              </div>
              <div className="avatar-actions">
                <Button variant='primary'>
                  Change Password
                </Button>
                <Button variant='danger'>
                  Delete Account
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Info Section */}
          <div className="profile-info-section">
            <div className="profile-header">
              <h1 className="profile-name">
                {userProfile?.full_name || userProfile?.username || 'User'}
              </h1>
              <button className="edit-btn" onClick={handleEditClick}>Edit</button>
            </div>
            <p className="profile-bio">
              {userProfile?.email || 'No bio available'}
            </p>
            {userProfile?.phone_number && (
              <p className="profile-phone">
                📞 {userProfile.phone_number}
              </p>
            )}
            {userProfile?.role && (
              <p className="profile-role">
                👤 {userProfile.role}
              </p>
            )}
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
        </div>
      </main>

      <Footer />

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={handleModalClose}
        userProfile={userProfile}
        onProfileUpdated={handleProfileUpdated}
      />
    </div>
  );
};

export default UserProfileScreen;