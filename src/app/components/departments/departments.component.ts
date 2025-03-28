import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModalComponent } from '../../shared/modals/app-modal/app-modal.component';
import { Department } from '../../entities.type';
import { DepartmentService } from '../../services/department.service';
import { HasPermissionDirective } from '../../directives/has-permission.directive';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  standalone: true,
  imports: [CommonModule, AppModalComponent, HasPermissionDirective],
  providers: [DepartmentService],
})
export class DepartmentsComponent implements AfterViewInit {
  private departmentService: DepartmentService = inject(DepartmentService);
  departments: Department[] = [];
  selectedDepartment?: Department;

  isCreateOpen: boolean = false;
  isUpdateOpen: boolean = false;
  isDeleteOpen: boolean = false;
  modalFields = [{ name: 'name', label: 'Department name', type: 'text' }];

  ngAfterViewInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.loadDepartments();
    this.departmentService.datas.subscribe((departments) => {
      this.departments = departments;
    });
  }

  openCreateModal() {
    this.selectedDepartment = undefined;
    this.isCreateOpen = true;
  }

  openUpdateModal(department: Department) {
    this.selectedDepartment = department;
    this.isUpdateOpen = true;
  }

  openDeleteModal(department: Department) {
    this.selectedDepartment = department;
    this.isDeleteOpen = true;
  }

  closeModal() {
    this.selectedDepartment = undefined;
    this.isCreateOpen = false;
    this.isDeleteOpen = false;
    this.isUpdateOpen = false;
  }

  onCreate(departmentData: Department) {
    this.departmentService.add(departmentData);
    this.isCreateOpen = false;
  }

  onUpdate(departmentData: Department) {
    if (this.selectedDepartment) {
      this.departmentService.edit(departmentData);
    }
    this.isUpdateOpen = false;
  }

  onDelete(id?: number) {
    if (id) {
      this.departmentService.deleteDep(id);
      this.isDeleteOpen = false;
    }
  }
}
