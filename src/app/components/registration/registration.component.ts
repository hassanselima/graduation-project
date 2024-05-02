import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  constructor(private auth: AuthService) {}

  errMsg: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
    ]),
  });

  registerOwner(): void {
    this.isLoading = true;

    const userDate = this.registerForm.value;
    console.log(this.registerForm.value);
    if (this.registerForm.valid == true) {
      this.auth.registerOwner(userDate).subscribe({
        next: (response) => {
          console.log('response from Reg.ts :', response);
          if (response.message === 'success') {
            // login
            // this._Router.navigate(['/login']);
            console.log('message : success ');

            this.isLoading = false;
          }
        },
        error: (err) => {
          this.errMsg = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
}
