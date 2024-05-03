import { FormControl } from '@angular/forms';

export interface IRegForm {
  firstName: FormControl;
  lastName: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  phoneNumber: FormControl;
  constaints: FormControl;
}
