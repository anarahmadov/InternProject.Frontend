import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.css',
})
export class ContextMenuComponent {
  @Input() selectedItem!: any;
  @Input() isOpen: boolean = false;
  @Output() openDelete = new EventEmitter();
  @Output() openUpdate = new EventEmitter();
  @Output() openEmployees = new EventEmitter();
  @Output() openManagers = new EventEmitter();
  @Output() close = new EventEmitter();
  @Input() hasEditPermission!: boolean;
  @Input() hasDeletePermission!: boolean;

  onAction(action: string) {
    switch (action) {
      case 'Delete':
        this.openDelete.emit(this.selectedItem);
        break;
      case 'Edit':
        this.openUpdate.emit(this.selectedItem);
        break;
      case 'getAllEmployees':
        this.openEmployees.emit(this.selectedItem);
        break;
      case 'getAllManagers':
        this.openManagers.emit(this.selectedItem);
        break;
      default:
        break;
    }
    this.isOpen = false;
  }

  closeModal() {
    this.close.emit();
    this.isOpen = false;
  }
}
