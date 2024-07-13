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
  selector: 'app-verfication',
  templateUrl: './verfication.component.html',
  styleUrl: './verfication.component.css',
})
export class VerficationComponent {
  errMsg: string = '';

  constructor(
    private fb: FormBuilder,
    private confSer: ConfirmationService,
    private sharedData: SharedDataService,
    private router: Router
  ) {}
  verificationForm: FormGroup = this.fb.group({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  getConfimation() {
    const ownerEmail: string = this.verificationForm.get('email')?.value;
    const observer = {
      next: (response: any) => {
        this.sharedData.setConfirmationData(response);
        this.sharedData.setDataParams({ email: ownerEmail });
        this.sharedData.setDataParams({ code: response.code });
        this.router.navigate(['/confirmation'], {
          queryParams: {
            action: 'verification',
          },
        });
      },
      error: (err: any) => {
        this.errMsg = err;
      },
    };
    this.confSer.confirmationCode(ownerEmail).subscribe(observer);
  }
}
