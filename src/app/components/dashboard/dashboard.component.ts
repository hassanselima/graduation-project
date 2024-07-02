import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  currentDate = new Date();
  constructor(private router: Router) {}
  get formattedDate(): string {
    const daysOfWeek = [
      'الأحد',
      'الاثنين',
      'الثلاثاء',
      'الأربعاء',
      'الخميس',
      'الجمعة',
      'السبت',
    ];
    const dayOfWeekIndex = this.currentDate.getDay();

    const dayOfWeek = daysOfWeek[dayOfWeekIndex];
    const formattedDate = this.currentDate.toLocaleDateString('ar-EG', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
    return `${dayOfWeek}، ${formattedDate}`;
  }
  goToProfile() {
    this.router.navigate(['/dashboard/profile']);
  }
}
