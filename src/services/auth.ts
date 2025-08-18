import apiClient from './api';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user?: any;
  [key: string]: any;
}

class AuthService {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/login', payload);
    if (res && res.token) {
      apiClient.setAuthToken(res.token);
    }
    return res;
  }

  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/register', payload);
    if (res && res.token) {
      apiClient.setAuthToken(res.token);
    }
    return res;
  }

  logout(): void {
    apiClient.clearAuthToken();
  }
}

export const authService = new AuthService();
export default authService;
