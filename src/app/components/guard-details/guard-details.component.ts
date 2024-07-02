import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guard-details',
  templateUrl: './guard-details.component.html',
  styleUrl: './guard-details.component.css',
})
export class GuardDetailsComponent implements OnInit {
  @Input() guards: any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    console.log('from guard details : ', this.guards);
  }
  getImage(base64Image: string): string {
    return `data:image/jpeg;base64,${base64Image}`;
  }
  edit(guardId: string) {
    console.log(guardId);
    this.router.navigate(['/dashboard/employees'], {
      queryParams: { action: 'edit' },
    });
  }
}
