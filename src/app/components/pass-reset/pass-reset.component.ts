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
import { ToastService } from 'angular-toastify';

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
    private router: Router,
    private toastSer: ToastService
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

    const observer = {
      next: (res: any) => {
        this.toastSer.success('Password updated successfully');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.toastSer.error(err.message);
      },
    };

    this.confirmServ
      .resetPassword(`${email}`, code, newPassword)
      .subscribe((res: any) => {
        this.router.navigate(['/login']);
      });
  }
}
