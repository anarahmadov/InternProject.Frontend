import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subordinate, Manager, Employee } from '../entities.type';
import { BehaviorSubject } from 'rxjs';
import { ApiResult, ApiResultGen } from '../models/apiresult.model';

@Injectable()
export class EmployeeService {
  private apiUrl: string = 'https://localhost:7247/api/employees';
  private authToken: string | null = localStorage.getItem('authToken');
  private http: HttpClient = inject(HttpClient);
  private employeesSubject = new BehaviorSubject<any[]>([]);
  employees$ = this.employeesSubject.asObservable();

  loadEmployees() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken ? 'Bearer ' + this.authToken : '',
    });

    this.http
      .get<ApiResultGen<Employee[]>>(`${this.apiUrl}/all`, { headers })
      .subscribe((response) => {
        if (response.succeeded) this.employeesSubject.next(response.result);
      });
  }

  getManagers(employeeId: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken ? 'Bearer ' + this.authToken : '',
    });

    this.http
      .get<ApiResultGen<Manager[]>>(`${this.apiUrl}/${employeeId}/managers`, { headers })
      .subscribe((response) => {
        if (response.succeeded) this.employeesSubject.next(response.result);
      });
  }

  getAllEmployeesByManager(managerId: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken ? 'Bearer ' + this.authToken : '',
    });

    this.http
      .get<
        ApiResultGen<Subordinate[]>
      >(`${this.apiUrl}/${managerId}/subordinates`, { headers })
      .subscribe((response) => {
        if (response.succeeded) this.employeesSubject.next(response.result);
      });
  }

  getEmployeesByManager(managerId: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken ? 'Bearer ' + this.authToken : '',
    });

    this.http
      .get<
        ApiResultGen<Subordinate[]>
      >(`${this.apiUrl}/${managerId}/subordinates/all`, { headers })
      .subscribe((response) => {
        if (response.succeeded) this.employeesSubject.next(response.result);
      });
  }

  edit(employeee: Employee) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken ? 'Bearer ' + this.authToken : '',
    });

    this.http
      .put<ApiResultGen<Employee>>(this.apiUrl, employeee, { headers })
      .subscribe((response) => {
        if (response.succeeded) {
          let updatedEmployee = response.result;
          const updatedEmployees = this.employeesSubject.value.map((pos) =>
            pos.id === employeee.id ? updatedEmployee : pos,
          );
          this.employeesSubject.next(updatedEmployees);
          alert(response.message);
        }
      });
  }

  addEmployee(newEmployee: Employee) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken ? 'Bearer ' + this.authToken : '',
    });

    this.http
      .post<ApiResultGen<Employee>>(this.apiUrl, newEmployee, { headers })
      .subscribe((response) => {
        if (response.succeeded) {
          let addedEmployee = response.result;
          const updatedEmployees = [
            ...this.employeesSubject.value,
            addedEmployee,
          ];
          this.employeesSubject.next(updatedEmployees);
          alert(response.message);
        }
      });
  }

  deleteEmployee(id: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken ? 'Bearer ' + this.authToken : '',
    });

    this.http
      .delete<ApiResult>(`${this.apiUrl}/${id}`, { headers })
      .subscribe((response) => {
        if (response.succeeded) {
          const updatedEmployees = this.employeesSubject.value.filter(
            (p) => p.id !== id,
          );
          this.employeesSubject.next(updatedEmployees);
        }
      });
  }
}
