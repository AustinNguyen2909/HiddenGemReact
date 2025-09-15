import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Title, Text, Button, AdminStatsCard } from '../../components';
import './BlogDetailManage.css';
import { blogs, blogStatuses } from '../../dummyData';

interface BlogDetailManageProps {
  className?: string;
}

const BlogDetailManage: React.FC<BlogDetailManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const blogId = Number(id);

  const blog = useMemo(() => blogs.find(b => b.id === blogId), [blogId]);

  const statusBadge = (status: string) => {
    const conf = blogStatuses.find(s => s.id === status);
    return (
      <span className={`blog-detail-manage__status-badge blog-detail-manage__status-badge--${status}`}>
        {conf?.label || status}
      </span>
    );
  };

  if (!blog) {
    return (
      <div className={`blog-detail-manage ${className}`}>
        <div className="blog-detail-manage__empty">
          <Title level="h2" size="lg" color="primary">Blog not found</Title>
          <Text variant="p" size="md" color="secondary">The blog you are looking for does not exist.</Text>
          <div className="blog-detail-manage__empty-actions">
            <Button variant="secondary" size="md" onClick={() => navigate('/admin/blogs')}>Back to Blogs</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`blog-detail-manage ${className}`}>
      <div className="blog-detail-manage__header">
        <div className="blog-detail-manage__header-left">
          <Title level="h1" size="xl" color="primary" className="blog-detail-manage__title">
            {blog.title}
          </Title>
          <div className="blog-detail-manage__meta">
            {statusBadge(blog.status)}
            <Text variant="span" size="sm" color="muted" className="blog-detail-manage__meta-item">
              {new Date(blog.publishedAt).toLocaleDateString()}
            </Text>
            <Text variant="span" size="sm" color="muted" className="blog-detail-manage__meta-item">•</Text>
            <Text variant="span" size="sm" color="muted" className="blog-detail-manage__meta-item">
              {blog.readingTime} min read
            </Text>
            <Text variant="span" size="sm" color="muted" className="blog-detail-manage__meta-item">•</Text>
            <Text variant="span" size="sm" color="muted" className="blog-detail-manage__meta-item">
              by {blog.author}
            </Text>
          </div>
        </div>
        <div className="blog-detail-manage__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/blogs')}>Back</Button>
          <Button variant="primary" size="md" onClick={() => navigate(`/admin/blogs/${blog.id}/edit`)} className="blog-detail-manage__edit-btn">Edit</Button>
        </div>
      </div>

      <div className="blog-detail-manage__stats">
        <AdminStatsCard title="Views" value={blog.views.toLocaleString()} icon="👀" trend={{ value: 0, isPositive: true }} />
        <AdminStatsCard title="Likes" value={blog.likes.toLocaleString()} icon="❤️" trend={{ value: 0, isPositive: true }} />
        <AdminStatsCard title="Comments" value={blog.comments.toString()} icon="💬" trend={{ value: 0, isPositive: true }} />
      </div>

      <div className="blog-detail-manage__content">
        <div className="blog-detail-manage__left">
          <div className="blog-detail-manage__image">
            <img src={blog.featuredImage} alt={blog.title} className="blog-detail-manage__image-img" />
          </div>

          <div className="blog-detail-manage__section">
            <Title level="h2" size="lg" color="primary" className="blog-detail-manage__section-title">Excerpt</Title>
            <Text variant="p" size="md" color="secondary" className="blog-detail-manage__excerpt">
              {blog.excerpt}
            </Text>
          </div>

          <div className="blog-detail-manage__section">
            <Title level="h2" size="lg" color="primary" className="blog-detail-manage__section-title">Content</Title>
            <div className="blog-detail-manage__body">
              <Text variant="p" size="md" color="primary">{blog.content}</Text>
            </div>
          </div>
        </div>

        <div className="blog-detail-manage__right">
          <div className="blog-detail-manage__panel">
            <Title level="h3" size="md" color="primary" className="blog-detail-manage__panel-title">Details</Title>
            <div className="blog-detail-manage__panel-row"><Text variant="span" size="sm" color="secondary">Category</Text><Text variant="span" size="sm" color="primary">{blog.category}</Text></div>
            <div className="blog-detail-manage__panel-row"><Text variant="span" size="sm" color="secondary">Tags</Text><Text variant="span" size="sm" color="primary">{blog.tags.join(', ')}</Text></div>
            <div className="blog-detail-manage__panel-row"><Text variant="span" size="sm" color="secondary">Updated</Text><Text variant="span" size="sm" color="primary">{new Date(blog.updatedAt).toLocaleString()}</Text></div>
            <div className="blog-detail-manage__panel-row"><Text variant="span" size="sm" color="secondary">Featured</Text><Text variant="span" size="sm" color="primary">{blog.isFeatured ? 'Yes' : 'No'}</Text></div>
          </div>

          <div className="blog-detail-manage__panel">
            <Title level="h3" size="md" color="primary" className="blog-detail-manage__panel-title">SEO</Title>
            <div className="blog-detail-manage__panel-row"><Text variant="span" size="sm" color="secondary">SEO Title</Text><Text variant="span" size="sm" color="primary">{blog.seoTitle || '-'}</Text></div>
            <div className="blog-detail-manage__panel-row"><Text variant="span" size="sm" color="secondary">SEO Description</Text><Text variant="span" size="sm" color="primary">{blog.seoDescription || '-'}</Text></div>
            <div className="blog-detail-manage__panel-actions">
              <Button variant="secondary" size="sm" onClick={() => navigate(`/admin/blogs/${blog.id}/edit#seo`)}>Edit SEO</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailManage;
