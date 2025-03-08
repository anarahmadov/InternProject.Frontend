export interface RegisterRequest{
    name: string,
    surname: string,
    email: string,
    password: string,
    dateOfBirth: Date
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface ForgotPasswordRequest {
  email: string;
}
export interface RenewPasswordRequest {
  email: string;
  newPassword: string;
}
export interface CheckOldPasswordRequest {
  email: string;
  password: string;
}