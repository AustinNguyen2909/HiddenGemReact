import React from 'react';
import { Footer } from '../../components';
import './BlogScreen.css';

interface BlogScreenProps {
  className?: string;
}

const BlogScreen: React.FC<BlogScreenProps> = ({ className = '' }) => {
  return (
    <div className={`blog-screen ${className}`}>
      <main className="blog-screen__main">
        <div className="blog-screen__container">
          <div className="blog-screen__content">
            <h1 className="blog-screen__title">Blog</h1>
            <div className="blog-screen__placeholder">
              <p>Blog content will be implemented here.</p>
              <p>This will include articles, news, and updates about hidden gems.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogScreen;
