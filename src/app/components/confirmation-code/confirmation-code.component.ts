import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from '../../services/confirmation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-confirmation-code',
  templateUrl: './confirmation-code.component.html',
  styleUrl: './confirmation-code.component.css',
})
export class ConfirmationCodeComponent implements OnInit {
  hiddenEmail!: string;
  regResponse: any = {};
  errMsg: any = '';
  isLoading: boolean = false;
  constructor(
    private recData: SharedDataService,
    private auth: AuthService,
    private router: Router,
    private confirmSer: ConfirmationService,
    private route: ActivatedRoute
  ) {}

  otpForm: FormGroup = new FormGroup({
    code: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{5}'),
      Validators.minLength(5),
    ]),
  });

  ngOnInit(): void {
    this.recData.currentConfirmationData.subscribe((data) => {
      this.regResponse = data;
      this.hiddenEmail = this.hideEmail(this.regResponse.email);
    });
    console.log('-------', this.regResponse);
  }

  onSubmit() {
    this.isLoading = true;
    const otp = this.otpForm.get('code');
    console.log('written code: ', otp?.value);
    this.errMsg = '';

    if (otp?.value.length !== 5) {
      this.errMsg = 'Invalid code. OTP must be 5 digits long.';
      this.isLoading = false;
      return;
    }
    this.route.queryParams.subscribe((params) => {
      const action = params['action'];
      if (action === 'registration') {
        const observer = {
          next: (response: any) => {
            console.log('response from confirm.ts :', response);
            this.router.navigate(['/login']);
            console.log('request : success ');
            this.isLoading = false;
          },
          error: (err: any) => {
            this.errMsg = err;
            this.isLoading = false;
          },
        };
        if (this.regResponse) {
          console.log('inside first if : ', this.regResponse);

          if (`${this.regResponse.code}` == otp.value) {
            this.confirmSer
              .confirmEmail(this.regResponse.email, otp.value)
              .subscribe(observer);
          } else {
            this.errMsg = 'Invalid code. Please try again.';
            this.isLoading = false;
          }
        }
      } else if (action === 'verification') {
        let recCode = this.recData.getUserData().code;
        console.log('rec Code : ', recCode);
        console.log('otp code : ', otp.value);
        if (this.regResponse) {
          console.log('inside first if : ', this.regResponse);
          if (recCode == otp.value) {
            console.log('rec Code : inside comparison', recCode);
            console.log('otp code : inside comparison', otp.value);
            this.router.navigate(['/passreset']);

            this.isLoading = false;
          } else {
            this.errMsg = 'Invalid code. Please try again.';
            this.isLoading = false;
          }
        }
      }
    });
  }
  removeError() {
    if (this.otpForm.valid) {
      this.errMsg = '';
    }
  }
  hideEmail(email: string): string {
    const [username, domain] = email.split('@');

    const hiddenUsername =
      username.length > 3
        ? '*'.repeat(username.length - 2) + username.slice(-2)
        : username;
    return hiddenUsername + '@' + domain;
  }
  resend() {
    this.errMsg = '';
    this.otpForm.get('code')?.setValue('');
    const observer = {
      next: (response: any) => {
        console.log('response from confirm.ts :', response);

        if (response.code) {
          this.recData.setConfirmationData(response);
          this.regResponse = response;
          // this.router.navigate(['/login']);
          console.log('request : success ');
          this.hiddenEmail = this.hideEmail(response.email);

          this.isLoading = false;
        }
      },
      error: (err: any) => {
        this.errMsg = err;
        this.isLoading = false;
      },
    };
    if (this.regResponse.email) {
      this.confirmSer
        .confirmationCode(this.regResponse.email)
        .subscribe(observer);
    }
    // this.confirmSer.confirmationCode('ali@gmail.com').subscribe(observer);
  }
}
