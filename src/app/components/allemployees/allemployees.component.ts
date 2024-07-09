import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GuardServicesService } from '../../services/guard-services.service';

@Component({
  selector: 'app-allemployees',
  templateUrl: './allemployees.component.html',
  styleUrl: './allemployees.component.css',
})
export class AllemployeesComponent implements OnInit {
  ownerId: string | null;
  ownToken: string | null;
  isLoading: boolean = false;
  guards: any = [];
  constructor(private router: Router, private guardhSer: GuardServicesService) {
    const currentUser = localStorage.getItem('currentUser');
    this.ownerId = currentUser ? JSON.parse(currentUser).ownerID : null;
    this.ownToken = localStorage.getItem('ownerToken');
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.fetchGuard();
  }
  fetchGuard() {
    const observer = {
      next: (res: any) => {
        if (res) {
          this.guards = res.guards;
        }
        this.isLoading = false;
        console.log('from all employees component  : ', this.guards);
      },
    };
    this.guardhSer.getGuards(this.ownerId, this.ownToken).subscribe(observer);
  }
  addGuard() {
    this.router.navigate(['/dashboard/employees'], {
      queryParams: { action: 'add' },
    });
  }
  reloadGuards(event: Event) {
    this.ngOnInit();
  }
}
