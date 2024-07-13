import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errMsg: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastSer: ToastService
  ) {}

  toggleType() {
    this.showPassword = !this.showPassword;
  }

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  login() {
    this.isLoading = true;
    const userDate = this.loginForm.value;
    const observer = {
      next: (response: any) => {
        if (response.user && response.token && response.role === 'Owner') {
          localStorage.setItem('ownerToken', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.toastSer.success('login successfully');
          this.router.navigate(['/dashboard/overview']);
          this.isLoading = false;
        } else {
          this.toastSer.error('Invalid response format');
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.toastSer.error('An error occurred while logging in');

        this.isLoading = false;
      },
    };
    if (this.loginForm.valid == true) {
      this.auth.login(userDate).subscribe(observer);
    }
  }
}
