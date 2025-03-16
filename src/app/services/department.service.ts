import { Injectable } from '@angular/core';
import { Department } from '../entities.type';
import { HttpService } from './http-service.service';

@Injectable()
export class DepartmentService extends HttpService {
  private apiUrl: string = 'https://localhost:7247/api/departments';

  loadDepartments() {
    this.getAll<Department[]>(`${this.apiUrl}/all`);
  }

  add(department: any) {
    this.post<Department>(this.apiUrl, department);
  }

  edit(department: Department) {
    this.put<Department>(this.apiUrl, department);
  }

  deleteDep(id: number) {
    this.delete<Department>(`${this.apiUrl}/${id}`);
  }
}
