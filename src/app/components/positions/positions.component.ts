import { Component, inject, OnInit } from '@angular/core';
import { PositionService } from '../../services/position.service';
import { Position } from '../../entities.type';
import { CommonModule } from '@angular/common';
import { AppModalComponent } from '../../shared/modals/app-modal/app-modal.component';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
  standalone: true,
  imports: [CommonModule, AppModalComponent],
})
export class PositionsComponent implements OnInit {
  private positionService: PositionService = inject(PositionService);
  positions: Position[] = [];
  selectedPosition?: Position;

  isCreateOpen: boolean = false;
  isUpdateOpen: boolean = false;
  isDeleteOpen: boolean = false;

  modalFields = [{ name: 'name', label: 'Position name', type: 'text' }];

  ngOnInit() {
    this.loadPositions();
  }

  loadPositions() {
    this.positionService.loadPositions();
    this.positionService.positions$.subscribe((positions) => {
      this.positions = positions;
    });
  }

  openCreateModal() {
    this.selectedPosition = undefined;
    this.isCreateOpen = true;
  }

  openUpdateModal(position: Position) {
    this.selectedPosition = position;
    this.isUpdateOpen = true;
  }

  openDeleteModal(position: Position) {
    this.selectedPosition = position;
    this.isDeleteOpen = true;
  }

  closeModal() {
    this.selectedPosition = undefined;
    this.isCreateOpen = false;
    this.isDeleteOpen = false;
    this.isUpdateOpen = false;
  }

  onCreate(positionData: Position) {
    this.positionService.addPosition(positionData);
    this.isCreateOpen = false;
  }

  onUpdate(positionData: Position) {
    if (this.selectedPosition) {
      this.positionService.edit(positionData);
    }
    this.isUpdateOpen = false;
  }

  onDelete(id?: number) {
    if (id) {
      this.positionService.deletePosition(id);
      this.isDeleteOpen = false;
    }
  }
}
