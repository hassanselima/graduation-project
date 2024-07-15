import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  constructor(private router: Router) {}
  goForHome() {
    if (localStorage.getItem('ownerToken')) {
      this.router.navigate(['/dashboard/overview']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
