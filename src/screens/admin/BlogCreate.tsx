import React, { useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input } from '../../components';
import './BlogCreate.css';
import { adminBlogCategories, blogAuthors, blogStatuses } from '../../dummyData';

interface BlogCreateProps {
  className?: string;
}

interface BlogForm {
  title: string;
  author: string;
  category: string;
  status: string;
  excerpt: string;
  content: string;
  tags: string;
  featuredImage: string;
  isFeatured: boolean;
  seoTitle: string;
  seoDescription: string;
}

const defaultForm: BlogForm = {
  title: '',
  author: '',
  category: '',
  status: 'draft',
  excerpt: '',
  content: '',
  tags: '',
  featuredImage: '',
  isFeatured: false,
  seoTitle: '',
  seoDescription: ''
};

const BlogCreate: React.FC<BlogCreateProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [form, setForm] = useState<BlogForm>(defaultForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = useMemo(() => adminBlogCategories, []);
  const authorOptions = useMemo(() => blogAuthors, []);
  const statusOptions = useMemo(() => blogStatuses, []);

  const updateField = (name: keyof BlogForm, value: any) => {
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.title || !form.author || !form.category) {
      setError('Please fill in the required fields: Title, Author, Category');
      return;
    }

    setIsSubmitting(true);
    try {
      // Mock API call
      await new Promise(r => setTimeout(r, 1000));
      // Navigate back to blogs list for now
      navigate('/admin/blogs');
    } catch (err: any) {
      setError('Failed to create blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`blog-create ${className}`}>
      <div className="blog-create__header">
        <div className="blog-create__header-left">
          <Title level="h1" size="xl" color="primary">Create Blog Post</Title>
          <Text variant="p" size="md" color="secondary">Add a new blog post with content, SEO, and publish settings</Text>
        </div>
        <div className="blog-create__header-right">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/blogs')}>Cancel</Button>
          <Button variant="primary" size="md" onClick={() => formRef.current?.requestSubmit()} disabled={isSubmitting}>Save</Button>
        </div>
      </div>

      <form ref={formRef} className="blog-create__form" onSubmit={handleSubmit}>
        <div className="blog-create__grid">
          <div className="blog-create__left">
            <div className="blog-create__card">
              <div className="blog-create__field">
                <label className="blog-create__label">Title *</label>
                <Input value={form.title} onChange={(e) => updateField('title', e.target.value)} placeholder="Enter title" fullWidth />
              </div>

              <div className="blog-create__field">
                <label className="blog-create__label">Excerpt</label>
                <textarea className="blog-create__textarea" value={form.excerpt} onChange={(e) => updateField('excerpt', e.target.value)} placeholder="Short summary" rows={3} />
              </div>

              <div className="blog-create__field">
                <label className="blog-create__label">Content</label>
                <textarea className="blog-create__textarea" value={form.content} onChange={(e) => updateField('content', e.target.value)} placeholder="Write your content..." rows={12} />
              </div>

              <div className="blog-create__field">
                <label className="blog-create__label">Featured Image URL</label>
                <Input value={form.featuredImage} onChange={(e) => updateField('featuredImage', e.target.value)} placeholder="https://..." fullWidth />
                {form.featuredImage && (
                  <div className="blog-create__image-preview">
                    <img src={form.featuredImage} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="blog-create__field">
                <label className="blog-create__label">Tags (comma separated)</label>
                <Input value={form.tags} onChange={(e) => updateField('tags', e.target.value)} placeholder="espresso, brew, tips" fullWidth />
              </div>
            </div>
          </div>

          <div className="blog-create__right">
            <div className="blog-create__card">
              <div className="blog-create__field">
                <label className="blog-create__label">Author *</label>
                <select className="blog-create__select" value={form.author} onChange={(e) => updateField('author', e.target.value)}>
                  <option value="">Select author</option>
                  {authorOptions.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div className="blog-create__field">
                <label className="blog-create__label">Category *</label>
                <select className="blog-create__select" value={form.category} onChange={(e) => updateField('category', e.target.value)}>
                  <option value="">Select category</option>
                  {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="blog-create__field">
                <label className="blog-create__label">Status</label>
                <select className="blog-create__select" value={form.status} onChange={(e) => updateField('status', e.target.value)}>
                  {statusOptions.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>

              <div className="blog-create__field">
                <label className="blog-create__label">Featured</label>
                <label className="blog-create__switch">
                  <input type="checkbox" checked={form.isFeatured} onChange={(e) => updateField('isFeatured', e.target.checked)} />
                  <span className="blog-create__switch-slider"></span>
                </label>
              </div>
            </div>

            <div className="blog-create__card">
              <Title level="h3" size="md" color="primary">SEO</Title>
              <div className="blog-create__field">
                <label className="blog-create__label">SEO Title</label>
                <Input value={form.seoTitle} onChange={(e) => updateField('seoTitle', e.target.value)} placeholder="SEO title" fullWidth />
              </div>
              <div className="blog-create__field">
                <label className="blog-create__label">SEO Description</label>
                <textarea className="blog-create__textarea" value={form.seoDescription} onChange={(e) => updateField('seoDescription', e.target.value)} placeholder="SEO description" rows={3} />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="blog-create__error">
            <Text variant="p" size="sm" color="primary">{error}</Text>
          </div>
        )}

        <div className="blog-create__footer-actions">
          <Button variant="secondary" size="md" onClick={() => navigate('/admin/blogs')}>Cancel</Button>
          <Button variant="primary" size="md" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</Button>
        </div>
      </form>
    </div>
  );
};

export default BlogCreate;
