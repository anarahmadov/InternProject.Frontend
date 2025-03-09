import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry(1),
    catchError((error: HttpErrorResponse) => {
      return throwError(error.error);
    }),
  );
};
