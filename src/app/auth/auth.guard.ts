import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let authState;

  authService.isAuthenticated$.subscribe(state => {
    authState = state;
  });
  if (!authState) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
