import React from 'react';
import { Footer } from '../../components';
import './StoreScreen.css';

interface StoreScreenProps {
  className?: string;
}

const StoreScreen: React.FC<StoreScreenProps> = ({ className = '' }) => {
  return (
    <div className={`store-screen ${className}`}>
      <main className="store-screen__main">
        <div className="store-screen__container">
          <div className="store-screen__content">
            <h1 className="store-screen__title">Store</h1>
            <div className="store-screen__placeholder">
              <p>Store content will be implemented here.</p>
              <p>This will include product listings, categories, and shopping functionality.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StoreScreen;
