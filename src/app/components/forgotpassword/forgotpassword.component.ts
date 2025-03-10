import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PasswordResetService } from '../../services/password-reset.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgotpassword.component.html',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm!: FormGroup;
  securityCodeForm!: FormGroup;
  submittedForgotPasswordForm = false;
  submittedSecurityCodeForm = false;
  formStatus: boolean = true;
  code: string = '';
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private passwordResetService: PasswordResetService,
  ) {}
  ngOnInit() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.formStatus) {
      if (this.forgotPasswordForm.valid) {
        this.submittedForgotPasswordForm = true;
        this.email = this.forgotPasswordForm.get('email')?.value;
        this.authService
          .forgotPassword(this.forgotPasswordForm.getRawValue())
          .subscribe((response) => {
            if (response && response.succeeded) {
              this.code = response.result;
            }
          });
        this.formStatus = false;
        this.securityCodeForm = this.fb.group({
          securityCode: ['', [Validators.required]],
        });
      }
    } else {
      if (this.securityCodeForm.valid) {
        this.submittedSecurityCodeForm = true;
        if (this.securityCodeForm.get('securityCode')?.value == this.code) {
          this.setEmail(this.email);
          this.router.navigate(['/renewpassword']);
        } else {
          alert('Wrong password!');
        }
      }
    }
  }

  setEmail(email: string) {
    this.passwordResetService.setEmail(email);
  }
}
