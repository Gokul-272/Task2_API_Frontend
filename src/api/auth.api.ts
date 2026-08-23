import api from './axios';
import { RegisterData, LoginData, ChangePasswordData, ForgotPasswordData, ResetPasswordData } from '../types/auth';

export const register = (data: RegisterData) => api.post('/auth/register', data);

export const login = (data: LoginData) => api.post('/auth/login', data);

export const logout = () => api.post('/auth/logout');

export const refreshToken = () => api.post('/auth/refresh');

export const changePassword = (data: ChangePasswordData) => api.post('/auth/change-password', data);

export const forgotPassword = (data: ForgotPasswordData) => api.post('/auth/forgot', data);

export const resetPassword = (data: ResetPasswordData) => api.post('/auth/reset-password', data);
