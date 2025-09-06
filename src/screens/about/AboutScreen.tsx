import React from 'react';
import { Footer, Title, Text, Button, Input } from '../../components';
import './AboutScreen.css';

interface AboutScreenProps {
  className?: string;
}

const AboutScreen: React.FC<AboutScreenProps> = ({ className = '' }) => {
  return (
    <div className={`about-screen ${className}`}>
      
      {/* Hero Banner Section */}
      <section className="about-hero">
        <div className="about-hero__overlay"></div>
        <div className="about-hero__content">
          <div className="about-hero__text">
            <Text className="about-hero__highlight" color="white">
              Hightlight news, ads, discount, HOT HOT
            </Text>
            <Title level="h1" size="xl" color="white" className="about-hero__title">
              Find the café, feel the vibe
            </Title>
          </div>
          <div className="about-hero__search">
            <div className="about-hero__search-container">
              <Input
                type="text"
                placeholder="Enter your location"
                className="about-hero__search-input"
              />
              <Button variant="primary" size="lg" className="about-hero__search-button">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="about-gallery">
        <div className="about-gallery__container">
          <div className="about-gallery__images">
            <div className="about-gallery__image about-gallery__image--large">
              <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Coffee shop interior" />
            </div>
            <div className="about-gallery__image about-gallery__image--large">
              <img src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Coffee brewing" />
            </div>
            <div className="about-gallery__grid">
              <div className="about-gallery__image">
                <img src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Coffee beans" />
              </div>
              <div className="about-gallery__image">
                <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Coffee cup" />
              </div>
              <div className="about-gallery__image">
                <img src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80" alt="Coffee shop" />
              </div>
            </div>
          </div>
          
          <div className="about-gallery__content">
            <Title level="h2" size="xl" color="primary" className="about-gallery__title">
              We Help To Achieve<br />Awesome Experience
            </Title>
            <Text variant="p" size="md" color="secondary" className="about-gallery__description">
              We believe that every coffee shop has a story, and every visit is a memorable experience. This website is a community diary where people continue to write their own coffee journeys.
            </Text>
            <Button variant="primary" size="lg" className="about-gallery__button">
              View All Team
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="about-main-content">
        <div className="about-main-content__container">
          <div className="about-main-content__header">
            <div className="about-main-content__line"></div>
            <Title level="h3" size="md" color="primary" className="about-main-content__title">
              About Us
            </Title>
            <div className="about-main-content__line"></div>
          </div>
          
          <div className="about-main-content__sections">
            {/* History Section */}
            <div className="about-content-section">
              <div className="about-content-section__image">
                <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Coffee history" />
              </div>
              <div className="about-content-section__text">
                <Title level="h3" size="xl" color="primary" className="about-content-section__title">
                  History of HiddenGems
                </Title>
                <div className="about-content-section__content">
                  <Text variant="p" size="md" color="secondary" className="about-content-section__paragraph">
                    The site was originally created by a group of friends who shared a passion for discovering unique cafes and creative spaces. Every time they gathered, they shared new places with each other, but it was often difficult to remember and introduce them to others.
                  </Text>
                  <Text variant="p" size="md" color="secondary" className="about-content-section__paragraph">
                    From that need, the idea of a platform for sharing favorite coffee shops was born - where people can post, review, save favorite places, and search for shops that suit their taste.
                  </Text>
                </div>
                <Button variant="outline" size="md" className="about-content-section__button">
                  Read More
                </Button>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="about-content-section about-content-section--reverse">
              <div className="about-content-section__text">
                <Title level="h3" size="xl" color="primary" className="about-content-section__title">
                  Why Choose us?
                </Title>
                <div className="about-content-section__content">
                  <Text variant="p" size="md" color="secondary" className="about-content-section__paragraph">
                    We – coffee lovers, cozy little corners lovers, and the feeling of finding a "just right" cafe – came together to create this place. At first, it was just a few lines shared in a group of close friends about the interesting cafes that each person discovered. But gradually, we realized: the common point between everyone is not only coffee, but also the interests, space, and experiences that each cafe brings.
                  </Text>
                  <Text variant="p" size="md" color="secondary" className="about-content-section__paragraph about-content-section__paragraph--highlight">
                    And so the idea was born: a platform where you can discover, share and connect over the coffee shops you love.
                  </Text>
                </div>
                <Button variant="outline" size="md" className="about-content-section__button">
                  Read More
                </Button>
              </div>
              <div className="about-content-section__image">
                <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="Why choose us" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutScreen;