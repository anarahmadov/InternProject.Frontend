import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, OnChanges, OnInit, output, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeesComponent } from '../../../employee-management/employees/employees.component';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AppModalComponent implements OnChanges {
  @Input() modalTitle: string = '';
  @Input() fields: { name: string; label: string; type?: string }[] = [];
  @Input() isEditMode: boolean = false;
  @Input() selectedItem?: any;
  @Input() isOpen: boolean = true;
  @Input() submitBtnText: string = 'Save';
  @Input() isConfirm: boolean = false;
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();
  @Output() confirm? = this.isConfirm ? new EventEmitter() : null;

  modalForm!: FormGroup;

  ngOnChanges(): void {
    this.modalForm = new FormGroup({
      name: new FormControl(this.selectedItem?.name || '', Validators.required),
    });
  }

  closeModal() {
    this.close.emit();
    this.isOpen = false;
    this.selectedItem = {};
  }

  saveChanges(isConfirm: boolean) {
    if (!isConfirm) {
      if (this.modalForm.valid) {
        const updatedPosition = { ...this.selectedItem, name: this.modalForm.value.name}; 
        this.save.emit(updatedPosition);
        this.isOpen = false;
      } else {
        alert("Please, enter required field correctly.");
      }
    }
    else {
      console.log();
      this.save.emit(this.selectedItem?.id);
      this.isOpen = false;
    }
  }
}
