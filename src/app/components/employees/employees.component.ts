import { GuardServicesService } from './../../services/guard-services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';
import { error } from 'console';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  action: string = '';
  ownerId: string | null = '';
  ownToken: string | null = '';
  addGuardForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharSer: SharedDataService,
    private guardSer: GuardServicesService
  ) {
    this.addGuardForm = fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
    });
  }
  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.ownerId = currentUser ? JSON.parse(currentUser).ownerID : null;
    this.ownToken = localStorage.getItem('ownerToken');

    this.route.queryParams.subscribe((params) => {
      this.action = params['action'];
    });
  }
  next() {
    const data = { ownerId: this.ownerId, ...this.addGuardForm.value };
    console.log(data);
    this.sharSer.setguardData(data);
    const observer = {
      next: (res: any) => {
        if (res) {
          this.sharSer.setguardData(res);
          console.log(
            'response form shared service : ',
            this.sharSer.getguardData()
          );
          console.log('guard added successfully');

          this.router.navigate(['/dashboard/employeesP2'], {
            queryParams: { action: 'add' },
          });
        }
      },
      error: (err: any) => {
        console.log(err);
      },
    };
    this.guardSer.addGuard(data, this.ownToken).subscribe(observer);
  }
}
