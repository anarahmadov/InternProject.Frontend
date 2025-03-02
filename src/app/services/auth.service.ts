import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, RegisterRequest } from '../request.type';
import { LoginResponse, RegisterResponse } from '../response.type';
import { ApiResultGen } from '../models/apiresult.model';

@Injectable()
export class AuthService {
  private apiUrl = 'https://localhost:7247/api/Identity';
  private http: HttpClient = inject(HttpClient);
  private permissionsSubject = new BehaviorSubject<string[]>([]);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  authState$ = this.isAuthenticatedSubject.asObservable();

  login(request: LoginRequest): Observable<ApiResultGen<LoginResponse>> {
    return this.http
      .post<ApiResultGen<LoginResponse>>(`${this.apiUrl}/login`, request)
      .pipe(
        tap((response: ApiResultGen<LoginResponse>) => {
          if (response && response.succeeded) {
            localStorage.setItem('authToken', response.result.accessToken);
            this.permissionsSubject.next(response.result.permissions);
            this.isAuthenticatedSubject.next(true);
          } else {
            alert(response.message);
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

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('permissions');
    this.permissionsSubject.next([]);
    this.isAuthenticatedSubject.next(false);
  }

  loadPermissionsFromLocalStorage(): void {
    const storedPermissions = localStorage.getItem('permissions');
    if (storedPermissions) {
      this.permissionsSubject.next(JSON.parse(storedPermissions));
      this.isAuthenticatedSubject.next(true);
    }
  }

  getPermissions(): Observable<string[]> {
    return this.permissionsSubject.asObservable();
  }

  hasPermission(permission: string): boolean {
    return this.permissionsSubject.value.includes(permission);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  showValueOfAuth() {
    return this.isAuthenticatedSubject.value;
  }
}
