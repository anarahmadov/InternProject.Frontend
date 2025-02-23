import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../entities.type';
import { AuthService } from './auth.service';
import { ApiResultGen } from '../models/apiresult.model';

@Injectable()
export class PositionService {
  private apiUrl: string = 'https://localhost:7247/api/positions';
  private authToken: string | null = localStorage.getItem('authToken');
  private authService: AuthService = inject(AuthService);
  private http: HttpClient = inject(HttpClient);

  getAll(): Observable<ApiResultGen<Position[]>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken ? 'Bearer ' + this.authToken : '',
    });
    return this.http.get<ApiResultGen<Position[]>>(`${this.apiUrl}/all`, {
      headers,
    });
  }

  edit(position: Position): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken ? 'Bearer ' + this.authToken : '',
    });
    return this.http.put(this.apiUrl, position, { headers });
  }

  delete(position: Position): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken ? 'Bearer ' + this.authToken : '',
    });
    return this.http.delete(`${this.apiUrl}/${position.id}`, { headers });
  }

  getToken(): string | null {
    return this.authService.getToken();
  }
}
