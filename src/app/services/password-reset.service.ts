import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  private email: string = '';

  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string {
    return this.email;
  }
}
