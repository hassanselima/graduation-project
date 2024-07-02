import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent implements OnInit {
  progress: number = 45;

  @Input() action: string = '';

  constructor() {}
  ngOnInit(): void {
    if (this.action === 'edit') {
      this.progress = 100;
    } else {
      this.progress = 45;
    }
  }
}
