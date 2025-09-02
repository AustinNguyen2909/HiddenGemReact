import React from 'react';
import { Footer } from '../../components';
import './AboutScreen.css';

interface AboutScreenProps {
  className?: string;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ className = '' }) => {
  return (
    <div className={`about-screen ${className}`}>
      <main className="about-screen__main">
        <div className="about-screen__container">
          <div className="about-screen__content">
            <h1 className="about-screen__title">About</h1>
            <div className="about-screen__placeholder">
              <p>About content will be implemented here.</p>
              <p>This will include company information, mission, team, and history.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutScreen;
