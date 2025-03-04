import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { Employee, Manager, Subordinate } from '../../entities.type';
import { CommonModule } from '@angular/common';
import { AppModalComponent } from '../../shared/modals/app-modal/app-modal.component';
import { EmployeeService } from '../../services/employee.service';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { TableModalComponent } from "../../shared/modals/table-modal/table-modal.component";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    AppModalComponent,
    TableModalComponent,
    ContextMenuComponent,
  ],
  providers: [EmployeeService],
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
  isManagersTableModalOpen: boolean = false;
  isEmployeesTableModalOpen: boolean = false;
  isContextMenuOpen: boolean = false;

  modalTitle: string = '';
  modalFields = [{ name: 'name', label: 'Employee name', type: 'text' }];

  @ViewChild('subordinatesTableModal') subordinatesTableModal!: TableModalComponent;
  @ViewChild('managersTableModal') managersTableModal!: TableModalComponent;

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
    this.modalTitle = 'Add new employee';
    this.selectedEmployee = undefined;
    this.isContextMenuOpen = false;
    this.isCreateOpen = true;
  }
  openUpdateModal(employee: Employee) {
    this.modalTitle = 'Update employee';
    this.selectedEmployee = employee;
    this.isContextMenuOpen = false;
    this.isUpdateOpen = true;
  }
  openDeleteModal() {
    this.modalTitle = 'Are you sure you want to delete this employee?';
    this.isContextMenuOpen = false;
    this.isDeleteOpen = true;
  }
  openManagersTableModal(selectedData: Employee) {
    this.selectedEmployee = selectedData;
    this.modalTitle = 'Managers';
    this.managersTableModal.open(this.modalTitle); 
    this.isManagersTableModalOpen = true;
  }
  openEmployeesTableModal(selectedData: Employee) {
    this.selectedEmployee = selectedData;
    this.modalTitle = 'Employees';
    this.subordinatesTableModal.open(this.modalTitle); 
    this.isEmployeesTableModalOpen = true;
  }
  openContextMenu(employee: Employee | undefined) {
    this.selectedEmployee = employee;
    console.log(this.selectedEmployee);
    this.isCreateOpen = false;
    this.isDeleteOpen = false;
    this.isUpdateOpen = false;
    this.isEmployeesTableModalOpen = false;
    this.isManagersTableModalOpen = false;
    this.isContextMenuOpen = true;
  }
  closeModal() {
    this.selectedEmployee = undefined;
    this.isCreateOpen = false;
    this.isDeleteOpen = false;
    this.isUpdateOpen = false;
    this.isEmployeesTableModalOpen = false;
    this.isManagersTableModalOpen = false;
    this.isContextMenuOpen = false;
  }
  onSelectedItemChange(selectedData: Employee) {
    this.selectedEmployee = selectedData;
  }

  onGetAllManagers(employeeId: number) {
    this.employeeService.getAllEmployeesByManager(employeeId);
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
