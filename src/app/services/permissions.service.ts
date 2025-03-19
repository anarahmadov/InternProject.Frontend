import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionsService {
  constructor(private http: HttpClient) { }

  loadPermissions() : Observable<string[]>{
    return this.http.get<string[]>('https://localhost:7247/api/Identity/permissions');
  }

}
