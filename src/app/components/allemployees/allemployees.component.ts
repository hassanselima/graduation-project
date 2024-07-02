import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashServicesService } from '../../services/dash-services.service';

@Component({
  selector: 'app-allemployees',
  templateUrl: './allemployees.component.html',
  styleUrl: './allemployees.component.css',
})
export class AllemployeesComponent implements OnInit {
  ownerId: string | null;
  ownToken: string | null;
  guards: any = [];
  constructor(private router: Router, private dashSer: DashServicesService) {
    const currentUser = localStorage.getItem('currentUser');
    this.ownerId = currentUser ? JSON.parse(currentUser).ownerID : null;
    this.ownToken = localStorage.getItem('ownerToken');
  }
  ngOnInit(): void {
    this.fetchGuard();
  }
  fetchGuard() {
    const observer = {
      next: (res: any) => {
        if (res) {
          this.guards.push(...res.guards);
        }
        console.log('from all employees component  : ', this.guards);
      },
    };
    this.dashSer.getGuards(this.ownerId, this.ownToken).subscribe(observer);
  }
  addGuard() {
    this.router.navigate(['/dashboard/employees'], {
      queryParams: { action: 'add' },
    });
  }
  edit() {}
}
