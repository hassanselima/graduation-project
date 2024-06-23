import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pg2',
  templateUrl: './add-pg2.component.html',
  styleUrl: './add-pg2.component.css',
})
export class AddPG2Component implements OnInit {
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
  workingDays: string[] = [];
  holidays: string[] = [];
  addPG2Form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.addPG2Form = fb.group({
      // country: ['', [Validators.required]],
      // city: ['', [Validators.required]],
      // address: ['', [Validators.required]],
      // longitude: ['', [Validators.required]],
      // latitude: ['', [Validators.required]],
      holidays: ['', [Validators.required]],
      openingHours: ['', [Validators.required]],
      closingHours: ['', [Validators.required]],
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
    this.addPG2Form.get('holidays')?.setValue(this.holidays);
  }
  next() {
    console.log('-------second page-------');
    console.log(this.addPG2Form.value);
    this.router.navigate(['/dashboard/playgrounds/add3']);
    console.log(this.workingDays);
    console.log(this.holidays);
  }
}
