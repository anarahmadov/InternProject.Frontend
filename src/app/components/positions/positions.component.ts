import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Department, Employee, Position } from '../../entities.type';
import { PositionService } from '../../services/position.service';
import { AuthService } from '../../services/auth.service';
import { ApiResultGen } from '../../models/apiresult.model';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [PositionService, AuthService]
})
export class PositionsComponent implements OnInit {
  private positionService: PositionService = inject(PositionService)
  positions!: Position[];
  positionColumns!: string[];

  ngOnInit(): void {
    this.positionService.getAll().subscribe((apiResponse) =>
    {
      let response = (apiResponse as ApiResultGen<Position[]>);
      
      this.positions = response.succeeded ? response.result : new Array();
      this.positionColumns = Object.keys(response.result[0]);
    })
  }

  editPosition(position: any) {
    const index = this.positions.indexOf(position, 0);
    if (index > -1) {
      this.positions.splice(index, position);
    }
  }

  deletePosition(position: any) {
    const index = this.positions.indexOf(position, 0);
    if (index > -1) {
      this.positions.splice(index, 1);
    }
  }
}
