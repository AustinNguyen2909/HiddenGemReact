import apiClient from './api';
import { BaseListData, BlogCreateRequest, BlogUpdateRequest } from './types';

export interface BlogPost {
  id: number;
  tieu_de: string;
  noi_dung: string;
  created_at?: string;
  // Additional fields for display
  excerpt?: string;
  author?: string;
  publishDate?: string;
  category?: string;
  image?: string;
  readTime?: string;
  featured?: boolean;
}

export interface BlogListResponse {
  data: BaseListData<BlogPost[]>;
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


