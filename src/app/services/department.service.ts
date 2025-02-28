import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Department } from '../entities.type';
import { BehaviorSubject } from 'rxjs';
import { ApiResult, ApiResultGen } from '../models/apiresult.model';

@Injectable()
export class DepartmentService {
  private apiUrl: string = 'https://localhost:7247/api/departments';
  private authToken: string | null = localStorage.getItem('authToken');
  private http: HttpClient = inject(HttpClient);
  private deparmentsSubject = new BehaviorSubject<any[]>([]);
  deparments$ = this.deparmentsSubject.asObservable();

  loadDepartments() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken ? 'Bearer ' + this.authToken : '',
    });

    this.http
      .get<ApiResultGen<Department[]>>(`${this.apiUrl}/all`, { headers })
      .subscribe((response) => {
        if (response.succeeded) this.deparmentsSubject.next(response.result);
      });
  }

  edit(deparment: Department) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken ? 'Bearer ' + this.authToken : '',
    });

    this.http
      .put<ApiResultGen<Department>>(this.apiUrl, deparment, { headers })
      .subscribe((response) => {
        if (response.succeeded) {
          let updatedDepartment = response.result;
          const updatedDepartments = this.deparmentsSubject.value.map((dep) =>
            dep.id === deparment.id ? updatedDepartment : dep,
          );
          this.deparmentsSubject.next(updatedDepartments);
          alert(response.message);
        }
      });
  }

  addDepartment(newDepartment: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken ? 'Bearer ' + this.authToken : '',
    });

    this.http
      .post<ApiResultGen<Department>>(this.apiUrl, newDepartment, { headers })
      .subscribe((response) => {
        if (response.succeeded) {
          let addedPosition = response.result;
          const updatedDepartments = [
            ...this.deparmentsSubject.value,
            addedPosition,
          ];
          this.deparmentsSubject.next(updatedDepartments);
          alert(response.message);
        }
      });
  }

  deleteDepartment(id: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken ? 'Bearer ' + this.authToken : '',
    });

    this.http
      .delete<ApiResult>(`${this.apiUrl}/${id}`, { headers })
      .subscribe((response) => {
        if (response.succeeded) {
          const updatedDepartments = this.deparmentsSubject.value.filter(
            (p) => p.id !== id,
          );
          this.deparmentsSubject.next(updatedDepartments);
        }
      });
  }
}
