import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-renew-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './renew-password.component.html',
  styleUrl: './renew-password.component.css',
})
export class RenewPasswordComponent implements OnInit {
  renewPasswordForm!: FormGroup;
  submitted = false;
  email: string = '';
  isOldPasswordValid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}
  ngOnInit(): void {
    this.renewPasswordForm = this.fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
            ),
          ],
        ],
        confirmNewPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator },
    );
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
  }

  get passwordsMismatch() {
    return this.renewPasswordForm.hasError('mismatch');
  }
  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmNewPassword')?.value;
    if (confirmPassword === "")
      return null;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.renewPasswordForm.valid) {
      this.submitted = true;
      const newPassword = this.renewPasswordForm.get('newPassword')?.value;
      this.authService
        .renewPassword({
          email: this.email,
          newPassword: newPassword })
        .subscribe((response) => {
          if (response && response.succeeded) {
            this.router.navigate(['/login']);
          };
        });
    }
  }
}
