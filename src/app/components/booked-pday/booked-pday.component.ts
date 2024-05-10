import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-booked-pday',
  templateUrl: './booked-pday.component.html',
  styleUrl: './booked-pday.component.css',
})
export class BookedPdayComponent implements OnInit {
  daysOfWeek: { [key: string]: string } = {
    Sunday: 'الأحد',
    Monday: 'الاثنين',
    Tuesday: 'الثلاثاء',
    Wednesday: 'الأربعاء',
    Thursday: 'الخميس',
    Friday: 'الجمعة',
    Saturday: 'السبت',
  };
  @Input() bookingsPDay!: { dayOfWeek: string; numberOfBookings: number }[];

  ngOnInit(): void {
    // console.log('form child : ', this.bookingsPDay);
  }
}
