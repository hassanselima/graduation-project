import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pg6',
  templateUrl: './add-pg6.component.html',
  styleUrl: './add-pg6.component.css',
})
export class AddPG6Component {
  constructor(private router: Router) {}
  next() {
    this.router.navigate(['/dashboard/playgrounds/bookable']);
  }
}
