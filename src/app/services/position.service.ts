import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Position } from '../entities.type';
import { BehaviorSubject } from 'rxjs';
import { ApiResult, ApiResultGen } from '../models/apiresult.model';

@Injectable()
export class PositionService {
  private apiUrl: string = 'https://localhost:7247/api/positions';
  private http: HttpClient = inject(HttpClient);
  private positionsSubject = new BehaviorSubject<any[]>([]);
  positions$ = this.positionsSubject.asObservable();

  loadPositions() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http
      .get<ApiResultGen<Position[]>>(`${this.apiUrl}/all`, { headers })
      .subscribe((response) => {
        if (response.succeeded) this.positionsSubject.next(response.result);
      });
  }

  edit(position: Position) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .put<ApiResultGen<Position>>(this.apiUrl, position, { headers })
      .subscribe((response) =>
      {
        if (response.succeeded) {
          let updatedPosition = response.result;
          const updatedPositions = this.positionsSubject.value.map((pos) =>
            pos.id === position.id ? updatedPosition : pos,
          );
          this.positionsSubject.next(updatedPositions);
          alert(response.message);
        }
        else {
          console.log(response.message);
        }
      });
  }

  addPosition(newPosition: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http
      .post<ApiResultGen<Position>>(this.apiUrl, newPosition, { headers })
      .subscribe((response) =>
      {
        if (response.succeeded) {
          let addedPosition = response.result;
          const updatedPositions = [
            ...this.positionsSubject.value,
            addedPosition,
          ];
          this.positionsSubject.next(updatedPositions);
          alert(response.message);
        } else {
          alert("Something went wrong.");
        }
      });
  }

  deletePosition(id: number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http
      .delete<ApiResult>(`${this.apiUrl}/${id}`, { headers })
      .subscribe((response) =>
      {
        if (response.succeeded) {
          const updatedPositions = this.positionsSubject.value.filter(
            (p) => p.id !== id,
          );
          this.positionsSubject.next(updatedPositions);
        }
      });
  }
}
