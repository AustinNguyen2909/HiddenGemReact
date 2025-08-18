import React, { useState } from 'react';
import './Register.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration attempt with:', { name, mobile, email, password });
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* Header */}
        <h1 className="register-title">
          Sign up
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="register-form">
          {/* Name Field */}
          <div className="register-field">
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="register-input"
            />
          </div>

          {/* Mobile Number Field */}
          <div className="register-field">
            <input
              type="tel"
              placeholder="Mobile number"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              required
              className="register-input"
            />
          </div>

          {/* Email Field */}
          <div className="register-field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="register-input"
            />
          </div>

          {/* Password Field */}
          <div className="register-field">
            <div className="register-password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="register-input password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="register-password-toggle"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            className="register-button"
          >
            Continue
          </button>
        </form>

        {/* Already have an account link */}
        <p className="register-signin-link">
          Already have an account?{' '}
          <a href="#">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register; 