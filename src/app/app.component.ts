import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'InternProject';
  isLoggedIn!: boolean;
  showEmployeesLink!: boolean;
  showPositionsLink!: boolean;
  showDepartmentsLink!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authState) => {
      this.isLoggedIn = authState;
    });
    this.authService.permissions$.subscribe(permissions => {
      this.showEmployeesLink = permissions.some(x => x.includes("EmployeeRead"));
      this.showDepartmentsLink = permissions.some(x => x.includes("DepartmentRead"));
      this.showPositionsLink = permissions.some(x => x.includes("PositionRead"));
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}