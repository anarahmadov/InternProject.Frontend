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