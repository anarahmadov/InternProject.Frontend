import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { PositionService } from '../../../services/position.service';
import { DepartmentService } from '../../../services/department.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Manager, Subordinate } from '../../../entities.type';

@Component({
  selector: 'app-table-modal',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf],
  templateUrl: './table-modal.component.html',
  styleUrl: './table-modal.component.css',
  providers: [EmployeeService, PositionService, DepartmentService],
})
export class TableModalComponent {
  @Input() modalTitle: string = '';
  @Input() selectedItemId: any;
  @Input() query!: string;
  @Input() isOpen: boolean = false;
  @Output() close = new EventEmitter();
  managerColumns: string[] = [
    '#',
    'Name',
    'Surname',
    'PositionName',
    'Level',
    'DateOfBirth',
  ];
  subordinateColumns: string[] = [
    '#',
    'Name',
    'Surname',
    'ManagerName',
    'PositionName',
    'DateOfBirth'
  ];
  managers: Manager[] = [];
  subordinates: Subordinate[] = [];

  constructor(private employeeService: EmployeeService) {}

  loadData(query: string) {
    switch (query) {
      case 'Employees':
        this.employeeService.getAllEmployeesByManager(this.selectedItemId);
        this.employeeService.datas.subscribe((value) => {
          this.subordinates = value;
        });
        break;
      case 'Managers':
        this.employeeService.getManagers(this.selectedItemId);
        this.employeeService.datas.subscribe((value) => {
          this.managers = value;
        });
        break;
      default:
        break;
    }
  }

  open(query: string) {
    this.isOpen = true;
    this.loadData(query);
  }
  closeModal() {
    this.isOpen = false;
    this.close.emit();
  }
}
