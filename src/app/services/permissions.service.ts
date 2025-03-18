import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionsService {
  constructor(private http: HttpClient) { }

  loadPermissions() : Observable<string[]>{
    return this.http.get<string[]>('https://localhost:7200/api/identity/permissions');
  }
}
