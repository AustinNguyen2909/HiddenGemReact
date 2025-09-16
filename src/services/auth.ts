import apiClient from './api';
import { BaseId } from './type';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name: string;
  phone_number: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: BaseUser;
}

export interface RegisterResponse {
  user_id: number;
  verify_email_token: string;
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

  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    const res = await apiClient.post<RegisterResponse>('/auth/register', payload);
    return res;
  }

  logout(): void {
    apiClient.clearAuthToken();
  }
}

export const authService = new AuthService();
export default authService;
