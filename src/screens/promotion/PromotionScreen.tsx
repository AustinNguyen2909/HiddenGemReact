import React from 'react';
import { Footer } from '../../components';
import './PromotionScreen.css';

interface PromotionScreenProps {
  className?: string;
}

const PromotionScreen: React.FC<PromotionScreenProps> = ({ className = '' }) => {
  return (
    <div className={`promotion-screen ${className}`}>
      <main className="promotion-screen__main">
        <div className="promotion-screen__container">
          <div className="promotion-screen__content">
            <h1 className="promotion-screen__title">Promotion</h1>
            <div className="promotion-screen__placeholder">
              <p>Promotion content will be implemented here.</p>
              <p>This will include special offers, deals, and promotional campaigns.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PromotionScreen;
