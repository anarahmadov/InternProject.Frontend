import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiResultGen } from '../models/apiresult.model';
import { Entity } from '../entities.type';

@Injectable()
export class HttpService {
  private datasSubject = new BehaviorSubject<any[]>([]);
  datas = this.datasSubject.asObservable();

  constructor(protected http: HttpClient) {}

  getAll<T extends Entity[]>(path: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .get<ApiResultGen<T[]>>(path, { headers })
      .subscribe((response) => {
        if (response.succeeded) {
          this.datasSubject.next(response.result);
        }
      });
  }

  post<T extends Entity>(path: string, body: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .post<ApiResultGen<T>>(path, body, { headers })
      .subscribe((response) => {
        if (response.succeeded) {
          const postedData = response.result;
          const updatedDatas = [...this.datasSubject.value, postedData];
          this.datasSubject.next(updatedDatas);
        }
      });
  }

  put<T extends Entity>(path: string, body: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http
      .put<ApiResultGen<T>>(path, body, { headers })
      .subscribe((response) => {
        if (response.succeeded) {
          let updatedData = response.result;
          const updatedDatas = this.datasSubject.value.map((dep) =>
            dep.id === updatedData.id ? updatedData : dep,
          );
          this.datasSubject.next(updatedDatas);
        }
      });
  }

  delete<T extends Entity>(path: string) {
    return this.http.delete<ApiResultGen<T>>(path).subscribe((response) => {
      if (response.succeeded) {
        const deletedDataId = path.split('/').pop();
        const updatedDatas = this.datasSubject.value.filter(
          (data) => data.id != deletedDataId,
        );
        this.datasSubject.next(updatedDatas);
      }
    });
  }

  patch<T>(path: string, body: any) {
    return this.http.patch<T>(path, body);
  }
}
