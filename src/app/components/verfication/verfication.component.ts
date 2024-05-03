import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-verfication',
  templateUrl: './verfication.component.html',
  styleUrl: './verfication.component.css',
})
export class VerficationComponent {
  constructor(private fb: FormBuilder) {}
  verificationForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  resetPass() {}
}
