import React from 'react';
import { Footer } from '../../components';
import './LocationScreen.css';

interface LocationScreenProps {
  className?: string;
}

const LocationScreen: React.FC<LocationScreenProps> = ({ className = '' }) => {
  return (
    <div className={`location-screen ${className}`}>
      <main className="location-screen__main">
        <div className="location-screen__container">
          <div className="location-screen__content">
            <h1 className="location-screen__title">Location</h1>
            <div className="location-screen__placeholder">
              <p>Location content will be implemented here.</p>
              <p>This will include maps, location listings, and search functionality.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LocationScreen;
