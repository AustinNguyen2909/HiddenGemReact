import apiClient from './api';
import { Banner, BannerCreateRequest, BannersListResponse } from './types';

class BannersService {
  list(params?: { vi_tri?: string; active?: number }): Promise<BannersListResponse> {
    return apiClient.get<BannersListResponse>('/banners', params);
  }

  create(payload: BannerCreateRequest): Promise<Banner> {
    return apiClient.post<Banner>('/banners', payload);
  }

  update(id: number, payload: Partial<BannerCreateRequest>): Promise<Banner> {
    return apiClient.patch<Banner>(`/banners/${id}`, payload);
  }
}

export const bannersService = new BannersService();
export default bannersService;


