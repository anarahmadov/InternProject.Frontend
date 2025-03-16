import { Injectable } from '@angular/core';
import { Position } from '../entities.type';
import { HttpService } from './http-service.service';

@Injectable()
export class PositionService extends HttpService {
  private apiUrl: string = 'https://localhost:7247/api/positions';

  loadPositions() {
    this.getAll<Position[]>(`${this.apiUrl}/all`);
  }

  edit(position: Position) {
    this.put(this.apiUrl, position);
  }

  add(position: any) {
    this.post(this.apiUrl, position);
  }

  deletePos(id: number) {
    this.delete(`${this.apiUrl}/${id}`);
  }
}
