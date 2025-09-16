import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import apiClient from '../../services/api';
import { TokenStorage } from '../../services/storage';
import authService, { LoginRequest, RegisterRequest, AuthResponse, BaseUser, RegisterResponse } from '../../services/auth';
import { toast } from 'react-toastify';

interface AuthContextValue {
  user: BaseUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (payload: LoginRequest) => Promise<AuthResponse>;
  register: (payload: RegisterRequest) => Promise<RegisterResponse>;
  logout: () => void;
  setUser: (user: BaseUser | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<BaseUser | null>(null);
  const [token, setToken] = useState<string | null>(() => TokenStorage.getToken());
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize api client with token if available
  useEffect(() => {
    if (token) {
      apiClient.setAuthToken(token);
    } else {
      apiClient.clearAuthToken();
    }
  }, [token]);

  const login = useCallback(async (payload: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.login(payload);
      if (res?.access_token) {
        setToken(res.access_token);
      }
      if (res?.user) {
        setUser(res.user);
      }
      return res;
    } catch (e: any) {
      toast.error(e?.data?.message || e?.message || 'Login failed');
      const message = (e?.data?.message || e?.message || 'Login failed');
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.register(payload);
      toast.success('Register successful');
      // if (res?.access_token) {
      //   setToken(res.access_token);
      // }
      // if (res?.user) {
      //   setUser(res.user);
      // }
      return res;
    } catch (e: any) {
      const message = (e?.data?.message || e?.message || 'Register failed');
      toast.error(message);
      setError(message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    token,
    isAuthenticated: Boolean(token),
    loading,
    error,
    login,
    register,
    logout,
    setUser,
  }), [user, token, loading, error, login, register, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
