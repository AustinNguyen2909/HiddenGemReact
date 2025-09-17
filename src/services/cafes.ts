import apiClient from './api';
import { CafeListResponse, CreateReviewRequest, Cafe } from './types';

export interface CafeDetail extends Cafe {}

export interface ReviewsListResponse {
  data: {
    items: Array<{ id: number; rating: number; content: string; user_id: number; created_at: string }>;
    total?: number;
  };
}

class CafesService {
  list(page?: number, per_page?: number): Promise<CafeListResponse> {
    return apiClient.get<CafeListResponse>('/cafes', { page, per_page });
    }

  search(q: string): Promise<CafeListResponse> {
    return apiClient.get<CafeListResponse>('/cafes/search', { q });
  }

  detail(id: number): Promise<CafeDetail> {
    return apiClient.get<CafeDetail>(`/cafes/${id}`);
  }

  getReviews(id: number): Promise<ReviewsListResponse> {
    return apiClient.get<ReviewsListResponse>(`/cafes/${id}/reviews`);
  }

  createReview(id: number, payload: CreateReviewRequest): Promise<void> {
    return apiClient.post<void>(`/cafes/${id}/reviews`, payload);
  }
}

export const cafesService = new CafesService();
export default cafesService;


