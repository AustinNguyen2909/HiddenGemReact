import apiClient from './api';
import { UpdateProfileRequest, ConsentRequest } from './types';

export interface UserProfile {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  phone_number?: string;
  role?: string;
}

class MeService {
  getProfile(): Promise<UserProfile> {
    return apiClient.get<UserProfile>('/me/profile');
  }

  updateProfile(payload: UpdateProfileRequest): Promise<UserProfile> {
    return apiClient.patch<UserProfile>('/me/profile', payload);
  }

  recordConsent(payload: ConsentRequest): Promise<void> {
    return apiClient.post<void>('/me/consent', payload);
  }

  exportData(): Promise<Blob | any> {
    return apiClient.get<any>('/me/export');
  }

  getTerms(): Promise<string> {
    return apiClient.get<string>('/policies/terms');
  }

  getPrivacy(): Promise<string> {
    return apiClient.get<string>('/policies/privacy');
  }
}

export const meService = new MeService();
export default meService;


