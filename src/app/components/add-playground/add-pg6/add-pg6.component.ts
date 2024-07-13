import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-pg6',
  templateUrl: './add-pg6.component.html',
  styleUrl: './add-pg6.component.css',
})
export class AddPG6Component implements OnInit {
  action: string = '';
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.action = params['action'];
    });
  }
  next() {
    this.router.navigate(['/dashboard/playgrounds/bookable']);
  }
}
