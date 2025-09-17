import apiClient from './api';
import { CreatePromotionRequest, PromotionApplyRequest, PromotionReviewRequest } from './types';

export interface StorePromotionsResponse {
  data: Array<{ id: number; ten_chuong_trinh: string; mo_ta?: string | null; ngay_bat_dau: string; ngay_ket_thuc: string }>;
}

class PromotionsService {
  create(payload: CreatePromotionRequest): Promise<void> {
    return apiClient.post<void>('/promotions', payload);
  }

  apply(id: number, payload: PromotionApplyRequest): Promise<void> {
    return apiClient.post<void>(`/promotions/${id}/apply`, payload);
  }

  review(id: number, payload: PromotionReviewRequest): Promise<void> {
    return apiClient.post<void>(`/promotions/${id}/review`, payload);
  }

  listByStore(storeId: number): Promise<StorePromotionsResponse> {
    return apiClient.get<StorePromotionsResponse>(`/stores/${storeId}/promotions`);
  }
}

export const promotionsService = new PromotionsService();
export default promotionsService;


