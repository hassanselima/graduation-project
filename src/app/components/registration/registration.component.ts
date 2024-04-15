import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
})
export class RegistrationComponent {
  regForm: any = {
    fName: '',
    lName: '',
    email: '',
    phoneNo: '',
    pass: '',
  };
  constructor() {}
}
