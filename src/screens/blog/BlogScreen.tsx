import React, { useState } from "react";
import { Footer, Button, Input, Text, Title } from "../../components";
import {
  featuredBlogPost,
  blogPosts,
  blogCategories,
  blogFilters,
  blogHeroContent,
} from "../../dummyData";
import "./BlogScreen.css";

interface BlogScreenProps {
  className?: string;
}

const BlogScreen: React.FC<BlogScreenProps> = ({ className = "" }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFrom, setDateFrom] = useState("12.12.2025");
  const [dateTo, setDateTo] = useState("12.12.2025");
  const [visiblePosts, setVisiblePosts] = useState(8);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedPosts = filteredPosts.slice(0, visiblePosts);

  const handleLoadMore = () => {
    setVisiblePosts((prev) => Math.min(prev + 4, filteredPosts.length));
  };

  return (
    <div className={`blog-screen ${className}`}>
      {/* Hero Banner Section */}
      <section className="blog-hero">
        <div className="blog-hero__overlay"></div>
        <div className="blog-hero__content">
          <div className="blog-hero__text">
            <Text className="blog-hero__highlight" color="white">
              {blogHeroContent.highlightText}
            </Text>
            <Title
              level="h1"
              size="xl"
              color="white"
              className="blog-hero__title"
            >
              {blogHeroContent.mainTitle}
            </Title>
          </div>
          <div className="blog-hero__search">
            <div className="blog-hero__search-container">
              <Input
                type="text"
                placeholder={blogHeroContent.searchPlaceholder}
                className="blog-hero__search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                variant="primary"
                size="lg"
                className="blog-hero__search-button"
              >
                {blogHeroContent.searchButtonText}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <main className="blog-screen__main">
        <div className="blog-screen__container">
          {/* Filter Section */}
          <section className="blog-filters">
            <div className="blog-filters__content">
              <div className="blog-filters__search">
                <Input
                  type="text"
                  placeholder={blogFilters.searchPlaceholder}
                  className="blog-filters__search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="blog-filters__controls">
                <div className="blog-filters__topics">
                  <select
                    className="blog-filters__topics-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {blogCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="blog-filters__date-inputs">
                  <Input
                    type="text"
                    placeholder={dateFrom}
                    className="blog-filters__date-input"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                  <div className="blog-filters__date-separator"></div>
                  <Input
                    type="text"
                    placeholder={dateTo}
                    className="blog-filters__date-input"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section Title */}
          <section className="blog-section-title">
            <Text className="blog-section-title__subtitle" color="secondary">
              {blogFilters.topicsLabel}
            </Text>
            <Title
              level="h2"
              size="xl"
              color="primary"
              className="blog-section-title__title"
            >
              Latest blog posts
            </Title>
          </section>

          {/* Featured Blog Post */}
          <section className="blog-featured">
            <div className="blog-featured__image">
              <img src={featuredBlogPost.image} alt={featuredBlogPost.title} />
            </div>
            <div className="blog-featured__content">
              <div className="blog-featured__meta">
                <Text className="blog-featured__date" color="secondary">
                  {featuredBlogPost.publishDate}
                </Text>
              </div>
              <Title
                level="h3"
                size="lg"
                color="primary"
                className="blog-featured__title"
              >
                {featuredBlogPost.title}
              </Title>
              <div className="blog-featured__excerpt">
                {featuredBlogPost.excerpt
                  .split("\n")
                  .map((paragraph, index) => (
                    <Text
                      key={index}
                      color="secondary"
                      className="blog-featured__paragraph"
                    >
                      {paragraph}
                    </Text>
                  ))}
              </div>
              <Button
                variant="outline"
                size="md"
                className="blog-featured__button"
              >
                Read More
              </Button>
            </div>
          </section>

          {/* Blog Posts Grid */}
          <section className="blog-posts">
            <div className="blog-posts__grid">
              {displayedPosts.map((post) => (
                <article key={post.id} className="blog-post-card">
                  <div className="blog-post-card__image">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="blog-post-card__content">
                    <div className="blog-post-card__meta">
                      <Text
                        className="blog-post-card__author"
                        color="secondary"
                      >
                        {post.author}
                      </Text>
                      <Text className="blog-post-card__date" color="secondary">
                        {post.publishDate}
                      </Text>
                    </div>
                    <Title
                      level="h4"
                      size="md"
                      color="primary"
                      className="blog-post-card__title"
                    >
                      {post.title}
                    </Title>
                    <Text className="blog-post-card__excerpt" color="secondary">
                      {post.excerpt}
                    </Text>
                    <Button
                      variant="outline"
                      size="sm"
                      className="blog-post-card__button"
                    >
                      Read More
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Load More Button */}
          {visiblePosts < filteredPosts.length && (
            <section className="blog-load-more">
              <Button
                variant="primary"
                size="lg"
                className="blog-load-more__button"
                onClick={handleLoadMore}
              >
                {blogFilters.loadMoreText}
              </Button>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogScreen;
