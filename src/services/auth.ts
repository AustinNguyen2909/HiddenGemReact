import apiClient from './api';
import { BaseId } from './type';

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
  access_token: string;
  refresh_token: string;
  user: BaseUser;
}

export interface BaseUser extends BaseId {
  "username": string
  "email": string
  "role": RoleType
}

export type RoleType = "customer" | "admin" | "shop"

class AuthService {
  async login(payload: LoginRequest): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/login', payload);
    if (res && res.access_token) {
      apiClient.setAuthToken(res.access_token);
    }
    return res;
  }

  async register(payload: RegisterRequest): Promise<AuthResponse> {
    const res = await apiClient.post<AuthResponse>('/auth/register', payload);
    if (res && res.access_token) {
      apiClient.setAuthToken(res.access_token);
    }
    return res;
  }

  logout(): void {
    apiClient.clearAuthToken();
  }
}

export const authService = new AuthService();
export default authService;
