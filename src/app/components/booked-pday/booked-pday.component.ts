import { Component } from '@angular/core';

@Component({
  selector: 'app-booked-pday',
  templateUrl: './booked-pday.component.html',
  styleUrl: './booked-pday.component.css',
})
export class BookedPdayComponent {
  progressWidth: string[] = [
    '100px',
    '85px',
    '40px',
    '60px',
    '50px',
    '60px',
    '40px',
  ];
}
