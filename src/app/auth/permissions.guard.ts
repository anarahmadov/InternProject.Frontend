import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredPermissions = route.data['permissions'] as string[];

  const hasAccess = authService.hasPermission(requiredPermissions);
  if (!hasAccess) {
    router.navigate(['/access-denied']);
    return false;
  }
  return true;
};
