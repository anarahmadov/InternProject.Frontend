import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { DepartmentsComponent } from './app/components/departments/departments.component';
import { PositionsComponent } from './app/components/positions/positions.component';
import { ForgotPasswordComponent } from './app/components/forgotpassword/forgotpassword.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'positions', component: PositionsComponent }
];

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});
