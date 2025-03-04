import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  @Input() isConfirm: boolean = false;
  @Input() isResponsible: boolean = false;
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();

  modalForm!: FormGroup;

  ngOnChanges(): void {
    this.buildForm();
  }
  buildForm() {
    this.modalForm = new FormGroup({
      name: new FormControl(this.selectedItem?.name || ''),
    });
    this.addValidations();
  }
  addValidations() {
    this.modalForm
      .get('name')
      ?.setValidators([Validators.required, Validators.minLength(3)]);
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
  closeModal() {
    this.close.emit();
  }
}
