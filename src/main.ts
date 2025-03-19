import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { DepartmentsComponent } from './app/components/departments/departments.component';
import { PositionsComponent } from './app/components/positions/positions.component';
import { ForgotPasswordComponent } from './app/components/forgotpassword/forgotpassword.component';
import { EmployeesComponent } from './app/employee-management/employees/employees.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { HomeComponent } from './app/components/home/home.component';
import { RenewPasswordComponent } from './app/components/renew-password/renew-password.component';
import { APP_INITIALIZER, ErrorHandler, inject } from '@angular/core';
import { GlobalErrorHandler } from './app/global-error-handler';
import { errorHandlingInterceptor } from './app/interceptors/error-handling.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { permissionsGuard } from './app/auth/permissions.guard';
import { AccessDeniedComponent } from './app/components/access-denied/access-denied.component';
import { authGuard } from './app/auth/auth.guard';
import { PermissionsService } from './app/services/permissions.service';
import { AuthService } from './app/services/auth.service';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'renewpassword', component: RenewPasswordComponent },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [authGuard, permissionsGuard],
    data: { permissions: ['EmployeeRead'] },
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    canActivate: [authGuard, permissionsGuard],
    data: { permissions: ['DepartmentRead'] },
  },
  {
    path: 'positions',
    component: PositionsComponent,
    canActivate: [authGuard, permissionsGuard],
    data: { permissions: ['PositionRead'] },
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', redirectTo: '/access-denied' },
];

export function initializeAppFactory(): () => void {
  let authService = inject(AuthService);

  return () => {  
    authService.userPermissions().subscribe(data => {
      authService.setPermissions(data.result);  
    });
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideHttpClient(
      withInterceptors([authInterceptor, errorHandlingInterceptor]),
    ),
    provideAnimationsAsync(),
    provideRouter(routes),
    AuthService,
    PermissionsService,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [AuthService],
      multi: true,
    },
  ],
});
