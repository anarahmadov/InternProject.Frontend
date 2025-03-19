import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { HasPermissionDirective } from './directives/has-permission.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    HasPermissionDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'InternProject';
  isLoggedIn!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((authState) => {
      this.isLoggedIn = authState;
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}