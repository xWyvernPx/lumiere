import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global error codes here (e.g., 401 Unauthorized)
    return Promise.reject(error);
  }
);
