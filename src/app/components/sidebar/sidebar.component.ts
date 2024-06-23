import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private router: Router) {}
  isPlaygroundsActive(): boolean {
    const currentUrl = this.router.url;
    return (
      currentUrl.endsWith('/playgrounds/bookable') ||
      currentUrl.endsWith('/playgrounds/unbookable')
    );
  }
}
