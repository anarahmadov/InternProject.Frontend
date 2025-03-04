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
      this.showEmployeesLink = permissions.some(x => x.includes("Employee"));
      this.showDepartmentsLink = permissions.some(x => x.includes("Department"));
      this.showPositionsLink = permissions.some(x => x.includes("Position"));
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}