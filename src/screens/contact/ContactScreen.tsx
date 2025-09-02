import React from 'react';
import { Footer } from '../../components';
import './ContactScreen.css';

interface ContactScreenProps {
  className?: string;
}

const ContactScreen: React.FC<ContactScreenProps> = ({ className = '' }) => {
  return (
    <div className={`contact-screen ${className}`}>
      <main className="contact-screen__main">
        <div className="contact-screen__container">
          <div className="contact-screen__content">
            <h1 className="contact-screen__title">Contact</h1>
            <div className="contact-screen__placeholder">
              <p>Contact content will be implemented here.</p>
              <p>This will include contact forms, information, and support options.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactScreen;
