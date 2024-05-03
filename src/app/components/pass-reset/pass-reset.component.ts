import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrl: './pass-reset.component.css',
})
export class PassResetComponent {
  showPassword: boolean = false;
  showRePassword: boolean = false;

  constructor(private fb: FormBuilder) {}
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

  updatePass() {}
}
