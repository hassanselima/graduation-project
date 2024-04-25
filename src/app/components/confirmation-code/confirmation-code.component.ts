import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-code',
  templateUrl: './confirmation-code.component.html',
  styleUrl: './confirmation-code.component.css',
})
export class ConfirmationCodeComponent implements OnInit {
  otpDigits: string[] = ['', '', '', '', ''];
  isButtonDisabled: boolean = true;
  hiddenEmail!: string;
  constructor() {}

  ngOnInit(): void {
    this.hiddenEmail = this.hideEmail('zeyad3892@gmail.com');
  }
  checkOtpFilled(): boolean {
    return this.otpDigits.every((digit) => !!digit);
  }

  onOtpInputChange(index: number, value: string): void {
    this.otpDigits[index] = value;
    const nextInputIndex = index + 1;
    const prevInputIndex = index - 1;

    if (!value) {
      if (prevInputIndex >= 0) {
        const prevInput = document.getElementById(`otp${prevInputIndex}`);
        if (prevInput) {
          prevInput.setAttribute('value', '');
          prevInput.focus();
        }
      }
    } else {
      const currentInput = document.getElementById(`otp${index}`);
      if (nextInputIndex < this.otpDigits.length) {
        const nextInput = document.getElementById(`otp${nextInputIndex}`);
        if (nextInput) {
          nextInput.setAttribute('value', '');
          nextInput.focus();
        }
      }
      if (currentInput) {
        currentInput.blur();
      }
    }

    this.isButtonDisabled = !this.checkOtpFilled();
  }

  onSubmit(): void {
    console.log(this.otpDigits.join(''));
  }
  hideEmail(email: string): string {
    const [username, domain] = email.split('@');

    const hiddenUsername =
      username.length > 3
        ? '*'.repeat(username.length - 2) + username.slice(-2)
        : username;
    return hiddenUsername + '@' + domain;
  }
}
