import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DashServicesService } from '../../../services/dash-services.service';
import { SharedDataService } from '../../../services/shared-data.service';
import { error } from 'console';

@Component({
  selector: 'app-add-pg4',
  templateUrl: './add-pg4.component.html',
  styleUrl: './add-pg4.component.css',
})
export class AddPG4Component implements OnInit {
  rules: string[] = ['لا يوجد', 'ممنوع التدخين'];
  selectedRule: string[] = [];
  ownerId: string | null = null;
  ownToken: string | null = null;
  pgAddResponse: any;
  pgData: any;
  action: string = '';
  addPG4Form: FormGroup;
  errMsg: string = '';
  currPgId: number = 0;
  guards: any = [
    {
      firstName: 'بدون',
      guardId: null,
      lastName: 'موظف',
    },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dashSer: DashServicesService,
    private sharedData: SharedDataService,
    private route: ActivatedRoute
  ) {
    this.addPG4Form = fb.group({
      rules: ['', [Validators.required]],
      guardId: [null],
    });
    const currentUser = localStorage.getItem('currentUser');
    this.ownerId = currentUser ? JSON.parse(currentUser).ownerID : null;
    this.ownToken = localStorage.getItem('ownerToken');
  }
  ngOnInit(): void {
    this.fetchGuard();
    this.getRouteAction();
  }
  getRouteAction() {
    this.route.queryParams.subscribe((params) => {
      this.action = params['action'];
      console.log(this.action);
      if (this.action === 'edit') {
        console.log('edit playground page 4');
        this.pgData = this.sharedData.getPgDataEdit();
        console.log(this.pgData);
        if (this.pgData) {
          this.addPG4Form.patchValue({
            rules: this.setRule(this.pgData?.playground?.rules?.split(',')),
            guardId: this.pgData?.playground?.guardId,
          });
          this.currPgId = this.pgData?.playground?.id;
        }
        console.log(this.addPG4Form.value);
      }
    });
  }
  setRule(rules: string[]) {
    console.log(rules);

    if (rules.includes('No Rules')) {
      this.selectedRule.push('لا يوجد');
    } else {
      this.selectedRule.push(...rules);
    }
    return rules.join(',');
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

  selectRule(rule: string) {
    const noRule = 'لا يوجد';
    if (rule === noRule) {
      this.selectedRule = ['لا يوجد'];
      this.addPG4Form.get('rules')?.setValue(['No Rules'].join(','));
    } else {
      const index = this.selectedRule.indexOf(rule);
      let noRuleIndex = this.selectedRule.indexOf('لا يوجد');
      if (index > -1) {
        this.selectedRule.splice(index, 1);
        if (this.selectedRule.length == 0) {
          this.selectedRule = ['لا يوجد'];
        }
      } else {
        if (noRuleIndex > -1) {
          this.selectedRule.splice(noRuleIndex, 1);
        }
        this.selectedRule.push(rule);
      }
      this.addPG4Form.get('rules')?.setValue(this.selectedRule.join(','));
    }

    console.log(this.selectedRule);
    console.log(this.addPG4Form.value);
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
    console.log(this.addPG4Form.value);
  }

  next() {
    console.log('-------fourth page-------');
    console.log(this.addPG4Form.value);
    this.sharedData.setPgData({ ...this.addPG4Form.value });
    this.sharedData.setPgData({
      ownerId: this.ownerId,
      id: this.action === 'add' ? 0 : this.currPgId,
    });
    console.log('from shared service');
    console.log(this.sharedData.getPgData());
    this.pgAddResponse = this.sharedData.getPgData();
    const observer = {
      next: (res: any) => {
        this.sharedData.resetPgData();
        this.sharedData.setPgData(res.playground);
        console.log('pgData : ', this.pgData);

        console.log(this.sharedData.getPgData());

        console.log('playground added successfully');
        if (this.pgData?.picture && this.action === 'edit') {
          this.router.navigate(['/dashboard/playgrounds/add6'], {
            queryParams: { action: this.action },
          });
        }
        this.router.navigate(['/dashboard/playgrounds/add5'], {
          queryParams: { action: this.action },
        });
      },
      error: (err: any) => {
        this.errMsg = 'حدث خطأ';
        console.log('something happened within adding playground');
      },
    };
    if (this.action === 'add') {
      this.dashSer
        .addPlayground(this.pgAddResponse, this.ownToken)
        .subscribe(observer);
    } else if (this.action === 'edit') {
      this.dashSer
        .editPlayground(this.pgAddResponse, this.ownToken)
        .subscribe(observer);
    }
  }
}
