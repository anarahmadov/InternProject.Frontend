import { AfterViewInit, Component, inject, signal } from '@angular/core';
import { PositionService } from '../../services/position.service';
import { Employee, Manager, Position, Subordinate } from '../../entities.type';
import { CommonModule } from '@angular/common';
import { AppModalComponent } from '../../shared/modals/app-modal/app-modal.component';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  standalone: true,
  imports: [CommonModule, AppModalComponent],
})
export class EmployeesComponent implements AfterViewInit {
  private employeeService: EmployeeService = inject(EmployeeService);
  subordinates: Subordinate[] = [];
  managers: Manager[] = [];
  employees: Employee[] = [];
  selectedEmployee?: Employee;

  isCreateOpen: boolean = false;
  isUpdateOpen: boolean = false;
  isDeleteOpen: boolean = false;

  isModalOpen: boolean = false;

  modalFields = [{ name: 'name', label: 'Employee name', type: 'text' }];

  ngAfterViewInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.loadEmployees();
    this.employeeService.employees$.subscribe((employees) => {
      this.employees = employees;
    });
  }

  openCreateModal() {
    this.selectedEmployee = undefined;
    this.isCreateOpen = true;
  }

  openUpdateModal(employee: Employee | undefined) {
    this.selectedEmployee = employee;
    this.isUpdateOpen = true;
  }

  openDeleteModal(employee: Employee | undefined) {
    this.selectedEmployee = employee;
    this.isDeleteOpen = true;
  }

  closeModal() {
    this.selectedEmployee = undefined;
    this.isCreateOpen = false;
    this.isDeleteOpen = false;
    this.isUpdateOpen = false;
  }

  onGetAllManagers(employeeId: number) {
    this.employeeService.getAllEmployeesByManager(employeeId);
  }
  onGetEmployeesByManager(managerId: number) {
    this.employeeService.getAllEmployeesByManager(managerId);
  }
  onGetAllEmployeesByManager(managerId: number) {
    this.employeeService.getAllEmployeesByManager(managerId);
  }

  onCreate(employeeData: Employee) {
    this.employeeService.addEmployee(employeeData);
    this.isCreateOpen = false;
  }

  onUpdate(employeeData: Employee) {
    if (this.selectedEmployee) {
      this.employeeService.edit(employeeData);
    }
    this.isUpdateOpen = false;
  }

  onDelete(id?: number) {
    if (id) {
      this.employeeService.deleteEmployee(id);
      this.isDeleteOpen = false;
    }
  }
}
