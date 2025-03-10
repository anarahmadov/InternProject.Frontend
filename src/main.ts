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
import { AuthService } from './app/services/auth.service';
import { HomeComponent } from './app/components/home/home.component';
import { RenewPasswordComponent } from './app/components/renew-password/renew-password.component';
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './app/global-error-handler';
import { errorHandlingInterceptor } from './app/interceptors/error-handling.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'renewpassword', component: RenewPasswordComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'positions', component: PositionsComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideHttpClient(
      withInterceptors([authInterceptor, errorHandlingInterceptor]),
    ),
    provideAnimationsAsync(),
    provideRouter(routes),
    AuthService,
  ],
});

