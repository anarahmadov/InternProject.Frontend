import { Component, inject, OnInit } from '@angular/core';
import { PositionService } from '../../services/position.service';
import { Position } from '../../entities.type';
import { CommonModule } from '@angular/common';
import { AppModalComponent } from '../../shared/modals/app-modal/app-modal.component';
import { HasPermissionDirective } from '../../directives/has-permission.directive';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss'],
  standalone: true,
  imports: [CommonModule, AppModalComponent, HasPermissionDirective],
  providers: [PositionService],
})
export class PositionsComponent implements OnInit {
  private positionService: PositionService = inject(PositionService);
  positions: Position[] = [];
  selectedPosition?: Position;

  isCreateOpen: boolean = false;
  isUpdateOpen: boolean = false;
  isDeleteOpen: boolean = false;
  modalFields = [{ name: 'name', label: 'Position name', type: 'text' }];

  ngOnInit(): void {
    this.loadPositions();
  }

  loadPositions() {
    this.positionService.loadPositions();
    this.positionService.datas.subscribe((positions) => {
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
    this.positionService.add(positionData);
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
      this.positionService.deletePos(id);
      this.isDeleteOpen = false;
    }
  }
}
