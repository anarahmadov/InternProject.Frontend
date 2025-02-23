import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken'); 
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Cloned Request:', clonedRequest);
      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler) {
  //   const authToken = this.authService.getToken();

  //   const clonedRequest =
  //     authToken ? req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } })
  //               : req;

  //   return next.handle(clonedRequest).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === 401) {
  //         console.error('Unauthorized request');
  //         this.router.navigate(['/login']);
  //       }
  //       if (error.status === 403) {
  //         console.error('Forbidden.');
  //       }

  //       return throwError(() => new Error(error.message));
  //     }),
  //   );
  // }
}
