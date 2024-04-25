import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  regForm: any = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  };

  respone: any;
  confirmationCode: string | undefined;
  constructor(private auth: AuthService) {}

  registerOwner() {
    const observer = {
      next: (response: any) => {
        this.confirmationCode = response.code;
        console.log('Registration successful : ', response);
      },
      error: (error: any) => {
        console.log('registeration failed');

        // console.error('Registration failed:', error);
      },
    };
    this.auth.registerOwner(this.regForm).subscribe(observer);
  }
}
