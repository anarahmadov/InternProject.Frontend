import { Injectable } from '@angular/core';
import { Subordinate, Manager, Employee } from '../entities.type';
import { HttpService } from './http-service.service';

@Injectable()
export class EmployeeService extends HttpService {
  private apiUrl: string = 'https://localhost:7247/api/employees';

  loadEmployees() {
    this.getAll<Employee[]>(`${this.apiUrl}/all`);
  }

  getManagers(employeeId: number) {
    this.getAll<Manager[]>(`${this.apiUrl}/${employeeId}/managers`);
  }

  getAllEmployeesByManager(managerId: number) {
    this.getAll<Subordinate[]>(`${this.apiUrl}/${managerId}/subordinates/all`);
  }

  getEmployeesByManager(managerId: number) {
    this.getAll<Subordinate[]>(`${this.apiUrl}/${managerId}/subordinates`);
  }

  edit(employee: Employee) {
    this.put<Employee>(this.apiUrl, employee);
  }

  add(employee: Employee) {
    this.post<Employee>(this.apiUrl, employee);
  }

  deleteEmp(id: number) {
    this.delete<Employee>(`${this.apiUrl}/${id}`);
  }
}
