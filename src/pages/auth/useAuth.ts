import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../lib/apiClient';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = loginSchema.extend({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  confirmPassword: z.string(),
  remember: z.boolean().refine((val) => val, {
    message: 'You must agree to the Terms',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type RegisterData = z.infer<typeof registerSchema>;

const login = async (data: LoginData) => {
  const response = await apiClient.post('/auth/email/login', data);
  return response;
};

const register = async (data: Omit<RegisterData, 'confirmPassword' | 'remember'>) => {
  const response = await apiClient.post('/auth/email/register', data);
  return response;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
  });
};

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

const forgotPassword = async (data: ForgotPasswordData) => {
  const response = await apiClient.post('/auth/forgot/password', data);
  return response.data?.id || response.data?.email ? response.data : response;
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const socialLogin = async (data: { provider: string, token: string }) => {
  const response = await apiClient.post(`/auth/${data.provider}/login`, { token: data.token });
  return response.data?.id || response.data?.email || response.data?.token ? response.data : response;
};

export const useSocialLogin = () => {
  return useMutation({
    mutationFn: socialLogin,
  });
};
