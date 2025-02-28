import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, OnChanges, OnInit, output, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeesComponent } from '../../../employee-management/employees/employees.component';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AppModalComponent implements OnChanges, OnInit {
  @Input() modalTitle: string = '';
  @Input() fields: { name: string; label: string; type?: string }[] = [];
  @Input() isEditMode: boolean = false;
  @Input() selectedItem?: any;
  @Input() isOpen: boolean = true;
  @Input() submitBtnText: string = 'Save';
  @Input() isConfirm: boolean = false;
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();

  modalForm!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let propName in changes) {
      let change = changes[propName];
      let curVal = JSON.stringify(change.currentValue);
      let prevVal = JSON.stringify(change.previousValue);
      console.log(
        `${propName}: currentValue = ${curVal}, previousValue = ${prevVal}`,
      );
    }
    this.buildForm();
  }

  buildForm() {
    this.modalForm = new FormGroup({
      name: new FormControl(
        this.selectedItem?.name || '',
        Validators.required
      ),
    });
    this.addValidations();
  }

  addValidations() {
    this.modalForm
      .get('name')?.setValidators([Validators.required, Validators.minLength(3)]);
  }

  closeModal() {
    this.close.emit();
    this.isOpen = false;
    this.selectedItem = {};
  }

  saveChanges(isConfirm: boolean) {
    if (!isConfirm) {
      if (this.modalForm.valid) {
        const updatedPosition = {
          ...this.selectedItem,
          name: this.modalForm.value.name,
        };
        this.save.emit(updatedPosition);
        this.isOpen = false;
      }
    } else {
      this.save.emit(this.selectedItem?.id);
      this.isOpen = false;
    }
  }
}
