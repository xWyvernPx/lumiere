import { apiClient } from '../lib/apiClient';

export const authService = {
  me: async () => {
    const res = await apiClient.get('/auth/me');
    return res.data?.id || res.data?.email ? res.data : res;
  }
};
