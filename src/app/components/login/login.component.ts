import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  forgotPasswordSecurityCode?: string;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: [
        '',[ Validators.required ],
      ],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.service.login(this.loginForm.getRawValue()).subscribe((response) => {
        if(response.succeeded) this.router.navigate(['/home']);
      });
    } else {
      this.errorMessage = 'Invalid credentials.';
    }
  }

  navigateToForgotPassword(){
    this.router.navigate(['/forgotpassword'], {
      queryParams: { email: this.forgotPasswordSecurityCode },
    });
  }
}
