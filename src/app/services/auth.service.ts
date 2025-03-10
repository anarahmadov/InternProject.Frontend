import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CheckOldPasswordRequest, ForgotPasswordRequest, LoginRequest, RegisterRequest, RenewPasswordRequest } from '../request.type';
import { LoginResponse, RegisterResponse } from '../response.type';
import { ApiResult, ApiResultGen } from '../models/apiresult.model';

@Injectable()
export class AuthService {
  private apiUrl = 'https://localhost:7247/api/Identity';
  private http: HttpClient = inject(HttpClient);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.loadAuthState(),
  );
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private permissionsSubject = new BehaviorSubject<string[]>(
    this.loadPermissions(),
  );
  permissions$ = this.permissionsSubject.asObservable();

  private loadAuthState(): boolean {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken != null && !this.isTokenExpired(storedToken)) {
      return true;
    }
    return false;
  }
  private loadPermissions(): string[] {
    const storedPermissions = localStorage.getItem('permissions');
    return storedPermissions ? JSON.parse(storedPermissions) : [];
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }
  login(request: LoginRequest): Observable<ApiResultGen<LoginResponse>> {
    return this.http
      .post<ApiResultGen<LoginResponse>>(`${this.apiUrl}/login`, request)
      .pipe(
        tap((response: ApiResultGen<LoginResponse>) => {
          if (response && response.succeeded) {
            this.setAuthToken(response.result.accessToken);
            this.setPermissions(response.result.permissions);
            return response.result;
          } else {
            return response.message;
          }
        }),
      );
  }
  register(
    request: RegisterRequest,
  ): Observable<ApiResultGen<RegisterResponse>> {
    return this.http
      .post<ApiResultGen<RegisterResponse>>(`${this.apiUrl}/register`, request)
      .pipe(
        tap((response: ApiResultGen<RegisterResponse>) => {
          if (response && response.succeeded) {
          }
        }),
      );
  }
  forgotPassword(
    request: ForgotPasswordRequest,
  ): Observable<ApiResultGen<string>> {
    return this.http
      .post<ApiResultGen<string>>(`${this.apiUrl}/forgotpassword`, request)
      .pipe(tap((response: ApiResultGen<string>) => {}));
  }
  renewPassword(request: RenewPasswordRequest): Observable<ApiResult> {
    return this.http
      .post<ApiResult>(`${this.apiUrl}/renewpassword`, request)
      .pipe(tap((response: ApiResult) => {}));
  }
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('permissions');
    this.permissionsSubject.next([]);
    this.isAuthenticatedSubject.next(false);
  }

  setAuthToken(token: string) {
    localStorage.setItem('authToken', token);
    this.isAuthenticatedSubject.next(true);
  }
  setPermissions(permissions: string[]) {
    localStorage.setItem('permissions', JSON.stringify(permissions));
    this.permissionsSubject.next(permissions);
  }
  hasPermission(requiredPermissions: string | string[]): boolean {
    const userPermissions = this.permissionsSubject.getValue();
    if (Array.isArray(requiredPermissions)) {
      return requiredPermissions.every((perm) =>
        userPermissions.includes(perm),
      );
    }
    return userPermissions.includes(requiredPermissions);
  }
  includesPermission(permission: string) {
    return this.permissionsSubject.value.some((p) =>
      p.toLowerCase().includes(permission.toLowerCase()),
    );
  }
}
