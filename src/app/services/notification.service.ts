import { Injectable, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerDialogComponent } from '../components/error-handler-dialog/error-handler-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private zone: NgZone,
  ) {}

  showClientError(message: string): void {
    this.zone.run(() => {
      this.snackbar.open(`Error: ${message}`, 'Okay', {
        panelClass: ['error-snack'],
      });
    });
  }

  openServerErrorDialog(message: string) {
    this.zone.run(() => {
      this.dialog.open(ErrorHandlerDialogComponent, {
        data: { message },
      });
    });
  }

  showNonErrorSnackBar(message: string, duration = 6000) {
    this.zone.run(() => {
      this.snackbar.open(message, 'Okay', {
        panelClass: ['error-snack'],
        duration
      });
    });
  }
}
