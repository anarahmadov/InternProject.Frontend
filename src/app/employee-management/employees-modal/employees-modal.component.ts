import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  Input,
  OnChanges,
  Output,
  Type,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './employees-modal.component.html',
  styleUrls: ['./employees-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class EmployeesModalComponent<T> {
  @Input() isOpen: boolean = false;
  @Input() selectedItemId!: number;
  @Input() modalTitle!: string;
  employees!: T[];
  tableColumns: T = Object.keys(typeof(this.employees[0]))

  closeModal() {
    this.isOpen = false;
    this.selectedItemId = -1;
  }

  getEmployeeData(employee: ) {
    return empl
  }
}
