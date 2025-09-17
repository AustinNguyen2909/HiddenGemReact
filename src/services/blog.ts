import apiClient from './api';
import { BlogCreateRequest, BlogUpdateRequest } from './types';

export interface BlogPost {
  id: number;
  tieu_de: string;
  noi_dung: string;
  created_at?: string;
}

export interface BlogListResponse {
  data: BlogPost[];
}

class BlogService {
  list(q?: string): Promise<BlogListResponse> {
    return apiClient.get<BlogListResponse>('/blog', { q });
  }

  create(payload: BlogCreateRequest): Promise<BlogPost> {
    return apiClient.post<BlogPost>('/blog', payload);
  }

  update(id: number, payload: BlogUpdateRequest): Promise<BlogPost> {
    return apiClient.patch<BlogPost>(`/blog/${id}`, payload);
  }
}

export const blogService = new BlogService();
export default blogService;


