import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { DepartmentsComponent } from './app/components/departments/departments.component';
import { PositionsComponent } from './app/components/positions/positions.component';
import { ForgotPasswordComponent } from './app/components/forgotpassword/forgotpassword.component';
import { EmployeesComponent } from './app/employee-management/employees/employees.component';
import { provideHttpClient } from '@angular/common/http';
import { authGuard } from './app/auth/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './app/interceptors/auth.interceptor';
import { PositionService } from './app/services/position.service';
import { AuthService } from './app/services/auth.service';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [authGuard],
  },
  { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
    canActivate: [authGuard],
  },
  {
    path: 'departments',
    component: DepartmentsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'positions',
    component: PositionsComponent,
    canActivate: [authGuard],
  },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    PositionService
  ],
});
