import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest, RegisterRequest } from '../request.type';
import { LoginResponse } from '../response.type';
import { ApiResultGen } from '../models/apiresult.model';

@Injectable()
export class AuthService {
  private apiUrl = 'https://localhost:7247/api/Identity';
  private http: HttpClient = inject(HttpClient);
  
  login(request: LoginRequest): Observable<ApiResultGen<LoginResponse>> {
    return this.http
      .post<ApiResultGen<LoginResponse>>(`${this.apiUrl}/login`, request)
      .pipe(
        tap((response: ApiResultGen<LoginResponse>) => {
          if (response && response.succeeded) {
            localStorage.setItem('authToken', response.result.accessToken);
          } else {
            alert(response.message);
          }
        }),
      );
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, request);
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
