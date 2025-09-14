import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input } from '../../components';
import './AdminLogin.css';

interface AdminLoginProps {
  className?: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple validation for demo purposes
      if (formData.email === 'admin@hiddengems.com' && formData.password === 'admin123') {
        // Store admin session
        localStorage.setItem('adminSession', 'true');
        localStorage.setItem('adminUser', JSON.stringify({
          email: formData.email,
          name: 'Admin User',
          role: 'admin'
        }));
        
        // Navigate to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`admin-login ${className}`}>
      <div className="admin-login__container">
        <div className="admin-login__card">
          <div className="admin-login__header">
            <div className="admin-login__logo">
              <div className="admin-login__logo-icon">☕</div>
              <Title level="h1" size="lg" color="primary" className="admin-login__logo-text">
                Hidden Gems
              </Title>
            </div>
            <Text variant="p" size="md" color="secondary" className="admin-login__subtitle">
              Admin Portal
            </Text>
          </div>

          <form className="admin-login__form" onSubmit={handleSubmit}>
            <div className="admin-login__form-header">
              <Title level="h2" size="xl" color="primary" className="admin-login__title">
                Sign In
              </Title>
              <Text variant="p" size="sm" color="secondary" className="admin-login__description">
                Enter your credentials to access the admin dashboard
              </Text>
            </div>

            <div className="admin-login__fields">
              <div className="admin-login__field">
                <label htmlFor="email" className="admin-login__label">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="admin@hiddengems.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  className="admin-login__input"
                />
              </div>

              <div className="admin-login__field">
                <label htmlFor="password" className="admin-login__label">
                  Password
                </label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  fullWidth
                  className="admin-login__input"
                />
              </div>
            </div>

            {error && (
              <div className="admin-login__error">
                <Text variant="p" size="sm" color="primary">
                  {error}
                </Text>
              </div>
            )}

            <div className="admin-login__actions">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isLoading}
                fullWidth
                className="admin-login__submit"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </div>

            <div className="admin-login__demo-credentials">
              <Text variant="p" size="xs" color="secondary" className="admin-login__demo-title">
                Demo Credentials:
              </Text>
              <Text variant="p" size="xs" color="secondary" className="admin-login__demo-text">
                Email: admin@hiddengems.com
              </Text>
              <Text variant="p" size="xs" color="secondary" className="admin-login__demo-text">
                Password: admin123
              </Text>
            </div>
          </form>

          <div className="admin-login__footer">
            <Text variant="p" size="xs" color="secondary" className="admin-login__footer-text">
              © 2024 Hidden Gems. All rights reserved.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
