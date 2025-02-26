import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { PositionsComponent } from './components/positions/positions.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { EmployeeManagementModule } from './employee-management/employee-management.module';
import { EmployeesComponent } from './employee-management/employees/employees.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    DepartmentsComponent,
    EmployeeManagementModule,
    EmployeesComponent,
    CommonModule,
    PositionsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'InternProject';
}
