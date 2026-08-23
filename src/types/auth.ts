export interface RegisterData {
  name: string;
  email: string;
  password?: string;
}

export interface LoginData {
  email: string;
  password?: string;
}

export interface ChangePasswordData {
  currentPassword?: string;
  newPassword?: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  newPassword?: string;
  token?: string;
}
