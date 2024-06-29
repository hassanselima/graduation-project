import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashServicesService } from '../../../services/dash-services.service';
import { SharedDataService } from '../../../services/shared-data.service';
import { error } from 'console';

@Component({
  selector: 'app-add-pg4',
  templateUrl: './add-pg4.component.html',
  styleUrl: './add-pg4.component.css',
})
export class AddPG4Component implements OnInit {
  rules: string[] = ['ممنوع التدخين'];
  selectedRule: string[] = [];
  ownerId: string | null = null;
  ownToken: string | null = null;
  errMsg: string = '';
  guards: any = [
    {
      firstName: 'بدون',
      guardId: null,
      lastName: 'موظف',
    },
  ];
  pgData: any;
  addPG4Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dashSer: DashServicesService,
    private sharedData: SharedDataService
  ) {
    this.addPG4Form = fb.group({
      rules: ['', [Validators.required]],
      guardId: ['', [Validators.required]],
    });
    const currentUser = localStorage.getItem('currentUser');
    this.ownerId = currentUser ? JSON.parse(currentUser).ownerID : null;
    this.ownToken = localStorage.getItem('ownerToken');
  }
  ngOnInit(): void {
    this.fetchGuard();
  }
  fetchGuard() {
    const observer = {
      next: (res: any) => {
        if (res) {
          this.guards.unshift(...res.guards);
        }
        console.log('from add-pg4 guards : ', this.guards);
      },
    };
    this.dashSer.getGuards(this.ownerId, this.ownToken).subscribe(observer);
  }

  selectRule(adv: string) {
    const index = this.selectedRule.indexOf(adv);
    if (index > -1) {
      this.selectedRule.splice(index, 1);
    } else {
      this.selectedRule.push(adv);
    }
    this.addPG4Form.get('rules')?.setValue(this.selectedRule.join(','));
    console.log(this.selectedRule);
  }
  addRule() {
    const newAdv = prompt('Enter new advantage: ');
    if (newAdv) {
      this.rules.push(newAdv);
    }
  }
  selectGuard(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    let guardId = selectElement.value;
    this.addPG4Form
      .get('guardId')
      ?.setValue(guardId === 'null' ? null : guardId);
    console.log(guardId);
  }

  next() {
    console.log('-------fourth page-------');
    console.log(this.addPG4Form.value);
    this.sharedData.setPgData({ ...this.addPG4Form.value });
    this.sharedData.setPgData({ ownerId: this.ownerId, id: 0 });
    console.log('from shared service');
    console.log(this.sharedData.getPgData());
    this.pgData = this.sharedData.getPgData();
    const observer = {
      next: (res: any) => {
        this.sharedData.resetPgData();
        this.sharedData.setPgData(res.playground);
        console.log(this.sharedData.getPgData());

        console.log('playground added successfully');

        this.router.navigate(['/dashboard/playgrounds/add5']);
      },
      error: (err: any) => {
        this.errMsg = 'حدث خطأ';
        console.log('something happened within adding playground');
      },
    };
    this.dashSer.addPlayground(this.pgData, this.ownToken).subscribe(observer);
  }
}
