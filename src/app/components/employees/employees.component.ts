import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  action: string = '';
  addGuardForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addGuardForm = fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      // password: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.action = params['action'];
    });
  }
  next() {
    this.router.navigate(['/dashboard/employeesP2'], {
      queryParams: { action: 'add' },
    });
  }
}
