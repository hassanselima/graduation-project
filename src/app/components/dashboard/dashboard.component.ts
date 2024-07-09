import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  currentDate = new Date();
  ownerFName: string | null = null;
  constructor(private router: Router) {}
  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');
    this.ownerFName = currentUser ? JSON.parse(currentUser).firstName : null;
  }
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
