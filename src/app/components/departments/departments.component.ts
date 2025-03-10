import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModalComponent } from '../../shared/modals/app-modal/app-modal.component';
import { Department } from '../../entities.type';
import { DepartmentService } from '../../services/department.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
  standalone: true,
  imports: [CommonModule, AppModalComponent],
  providers: [DepartmentService],
})
export class DepartmentsComponent implements AfterViewInit, OnInit {
  private departmentService: DepartmentService = inject(DepartmentService);
  departments: Department[] = [];
  selectedDepartment?: Department;

  isCreateOpen: boolean = false;
  isUpdateOpen: boolean = false;
  isDeleteOpen: boolean = false;
  modalFields = [{ name: 'name', label: 'Department name', type: 'text' }];

  showEditButton!: boolean;
  showDeleteButton!: boolean;
  showCreateButton!: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.permissions$.subscribe((permissions) => {
      this.showCreateButton = permissions.some(x => x == "DepartmentCreate");
      this.showDeleteButton = permissions.some(x => x == "DepartmentDelete");
      this.showEditButton = permissions.some(x => x == "DepartmentUpdate");
    });
  }

  ngAfterViewInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.departmentService.loadDepartments();
    this.departmentService.deparments$.subscribe((departments) => {
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
    this.departmentService.addDepartment(departmentData);
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
      this.departmentService.deleteDepartment(id);
      this.isDeleteOpen = false;
    }
  }
}
