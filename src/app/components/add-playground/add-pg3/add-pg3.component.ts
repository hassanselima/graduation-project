import { join } from 'node:path';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-add-pg3',
  templateUrl: './add-pg3.component.html',
  styleUrl: './add-pg3.component.css',
})
export class AddPG3Component implements OnInit {
  // @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement> | undefined;
  advantages: string[] = [
    'مرافق صحية',
    'مواقف سيارات',
    'غرف تبديل الملابس',
    'اضاءة',
    'واي فاي',
    'إسعاف وطوارئ',
    'عشب',
  ];
  hours: number[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  daysOfWeek: string[][] = [
    ['الأحد', 'Sunday'],
    ['الاثنين', 'Monday'],
    ['الثلاثاء', 'Tuesday'],
    ['الأربعاء', 'Wednesday'],
    ['الخميس', 'Thursday'],
    ['الجمعة', 'Friday'],
    ['السبت', 'Saturday'],
  ];
  selectedAdvs: string[] = [];
  workingDays: string[] = [];
  holidays: string[] = [];

  addPG3Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sharedData: SharedDataService
  ) {
    this.addPG3Form = fb.group({
      openingHour: ['', [Validators.required]],
      closingHour: ['', [Validators.required]],
      holidays: ['', [Validators.required]],
      advantages: ['', [Validators.required]],
      feesForHour: ['', [Validators.required]],
      cancellationFees: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.holidays = this.daysOfWeek.map((day) => day[1]);
  }
  selectDay(day: string) {
    console.log(day);

    const indexInWorkingDays = this.workingDays.indexOf(day);
    const indexInHolidays = this.holidays.indexOf(day);

    if (indexInWorkingDays > -1) {
      this.workingDays.splice(indexInWorkingDays, 1);
      this.holidays.push(day);
    } else {
      this.workingDays.push(day);
      this.holidays.splice(indexInHolidays, 1);
    }
    this.addPG3Form.get('holidays')?.setValue(this.holidays);
  }
  selectadv(adv: string) {
    const index = this.selectedAdvs.indexOf(adv);
    if (index > -1) {
      this.selectedAdvs.splice(index, 1);
    } else {
      this.selectedAdvs.push(adv);
    }
    this.addPG3Form.get('advantages')?.setValue(this.selectedAdvs);
    console.log(this.selectedAdvs);
  }
  addadv() {
    const newAdv = prompt('Enter new advantage: ');
    if (newAdv) {
      this.advantages.push(newAdv);
    }
  }

  next() {
    const { holidays, advantages, feesForHour } = this.addPG3Form.value;
    const openingHours = `${this.addPG3Form.get('openingHour')?.value}:${
      this.addPG3Form.get('closingHour')?.value
    }`;
    console.log('-------third page-------');
    console.log(this.addPG3Form.value);
    this.sharedData.setPgData({
      holidays: holidays.join(','),
      advantages: advantages.join(','),
      feesForHour,
      openingHours,
    });

    this.router.navigate(['/dashboard/playgrounds/add4']);
    // console.log(this.workingDays);
    // console.log(this.holidays);
  }
}
