import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) {}

  login() {
    const observer = {
      next: (response: any) => {
        console.log('Login successful:', response);
      },
      error: (error: any) => {
        console.log('Login failed:', error);
        // console.error('Login failed:', error);
      },
    };
    this.auth.login(this.email, this.password).subscribe(observer);
  }
}
