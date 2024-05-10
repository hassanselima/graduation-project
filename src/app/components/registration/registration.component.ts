import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  errMsg: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;
  showRePassword: boolean = false;
  registerForm: FormGroup;
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private recData: SharedDataService
  ) {
    this.registerForm = fb.group(
      {
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
          ],
        ],
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(25),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('[0-9]{11}')],
        ],
        constaints: ['', [Validators.required]],
      },
      {
        validators: this.IsPasswordMatch,
      }
    );
  }

  toggleType(i: number) {
    i === 1
      ? (this.showPassword = !this.showPassword)
      : (this.showRePassword = !this.showRePassword);
  }
  IsPasswordMatch(registerForm: FormGroup) {
    const passwordControl = registerForm.get('password');
    const RePasswordControl = registerForm.get('confirmPassword');
    if (passwordControl?.value !== RePasswordControl?.value) {
      RePasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      RePasswordControl?.setErrors(null);
    }
  }

  registerOwner(): void {
    this.isLoading = true;

    const { confirmPassword, constaints, ...userDate } =
      this.registerForm.value;
    console.log(userDate);
    const observer = {
      next: (response: any) => {
        console.log('response from Reg.ts :', response);
        const { message, ...data } = response;
        if (response.code) {
          console.log(data);
          this.recData.setConfirmationData(data);
          this.router.navigate(['/confirmation'], {
            queryParams: { action: 'registration' },
          });
          console.log('request : success ');

          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.errMsg = err;
        this.isLoading = false;
      },
    };
    if (this.registerForm.valid == true) {
      this.auth.registerOwner(userDate).subscribe(observer);
    }
  }
}
