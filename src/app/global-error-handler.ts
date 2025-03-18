import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './services/notification.service';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector,
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone) { }

  handleError(error: Error | HttpErrorResponse) {
    const notifier = this.injector.get(NotificationService);
    let message: string;
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        notifier.showNonErrorSnackBar('Session expired', 1000);
        this.authService.logout();
        this.ngZone.run(() => {
          this.router.navigate(['/login']);
        });
      }
      else
      notifier.showClientError(error.message);
    }
    else {
      message = error.message ? error.message : error.toString();
      notifier.showClientError(message);
    }
  }
}
