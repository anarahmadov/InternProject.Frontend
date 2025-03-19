export interface LoginResponse {
  userId: number;
  accessToken: string;
  refreshToken: string;
  permissions: Array<string>;
}
export interface RegisterResponse {
  userId: number;
}
