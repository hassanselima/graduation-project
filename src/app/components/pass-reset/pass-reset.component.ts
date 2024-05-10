import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService } from '../../services/confirmation.service';
import { SharedDataService } from '../../services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrl: './pass-reset.component.css',
})
export class PassResetComponent {
  showPassword: boolean = false;
  showRePassword: boolean = false;
  errMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private confirmServ: ConfirmationService,
    private sharedData: SharedDataService,
    private router: Router
  ) {}
  toggleType(i: number) {
    i === 1
      ? (this.showPassword = !this.showPassword)
      : (this.showRePassword = !this.showRePassword);
  }
  resetPassForm: FormGroup = this.fb.group(
    {
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      constraints: new FormControl('', [Validators.required]),
    },
    { validator: this.IsPasswordMatch }
  );

  IsPasswordMatch(registerForm: FormGroup) {
    const passwordControl = registerForm.get('password');
    const RePasswordControl = registerForm.get('confirmPassword');
    if (passwordControl?.value !== RePasswordControl?.value) {
      RePasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      RePasswordControl?.setErrors(null);
    }
  }

  updatePass() {
    const { email, code } = this.sharedData.getUserData();
    const newPassword: string = this.resetPassForm.get('password')?.value;
    console.log(email);
    console.log(typeof code, code);
    console.log(newPassword);
    const observer = {
      next: (res: any) => {
        console.log('Password updated successfully');
        console.log(res);

        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.errMsg = err.message;
      },
    };

    this.confirmServ
      .resetPassword(`${email}`, code, newPassword)
      .subscribe((res: any) => {
        console.log('password Updated successfully');
        this.router.navigate(['/login']);
      });
  }
}
