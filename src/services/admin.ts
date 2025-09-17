import apiClient from './api';
import { AdminDashboardResponse, AdminSetRoleRequest } from './types';

export interface PendingStore {
  id: number;
  ten_cua_hang: string;
}

export interface PendingStoresResponse { data: PendingStore[] }

export interface AdminStoreApproveRequest { action: 'approve' | 'reject' }

class AdminService {
  dashboard(): Promise<AdminDashboardResponse> {
    return apiClient.get<AdminDashboardResponse>('/admin/dashboard');
  }

  setUserRole(payload: AdminSetRoleRequest): Promise<void> {
    return apiClient.post<void>('/admin/users/role', payload);
  }

  deleteUser(id: number): Promise<void> {
    return apiClient.delete<void>(`/admin/users/${id}`);
  }

  pendingStores(): Promise<PendingStoresResponse> {
    return apiClient.get<PendingStoresResponse>('/admin/pending-stores');
  }

  reviewStore(id: number, payload: AdminStoreApproveRequest): Promise<void> {
    return apiClient.post<void>(`/admin/stores/${id}/approve`, payload);
  }
}

export const adminService = new AdminService();
export default adminService;


