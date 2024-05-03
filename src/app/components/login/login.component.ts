import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errMsg: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(private auth: AuthService) {}

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
    console.log('sended data : ', userDate);
    const observer = {
      next: (response: any) => {
        if (response.user && response.token) {
          console.log('login response : ', response);

          localStorage.setItem('ownerToken', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          // this._Router.navigate(['/home']);
          this.isLoading = false;
        } else {
          console.error('Invalid response format');
          this.errMsg = 'Invalid response format';
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.errMsg = 'An error occurred while logging in';
        this.isLoading = false;
      },
    };
    if (this.loginForm.valid == true) {
      this.auth.login(userDate).subscribe(observer);
    }
  }
}
