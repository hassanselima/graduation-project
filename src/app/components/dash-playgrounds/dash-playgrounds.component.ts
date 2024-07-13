import { Component, OnInit } from '@angular/core';
import { DashServicesService } from '../../services/dash-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-playgrounds',
  templateUrl: './dash-playgrounds.component.html',
  styleUrl: './dash-playgrounds.component.css',
})
export class DashPlaygroundsComponent implements OnInit {
  ownerId: string | null = null;
  ownToken: string | null = null;
  allPGs: any[] = [];
  filterdPGs: any[] = [];
  isLoading: boolean = false;
  constructor(private dashSer: DashServicesService, private router: Router) {
    const currentUser = localStorage.getItem('currentUser');
    this.ownerId = currentUser ? JSON.parse(currentUser).ownerID : null;
    this.ownToken = localStorage.getItem('ownerToken');
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.fetchPlaygrounds();
  }
  fetchPlaygrounds(): void {
    const observer = {
      next: (res: any) => {
        if (res) {
          this.allPGs = res.playgrounds;
          this.filterPlaygrounds();
        }
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
      },
    };
    this.dashSer.playgrounds(this.ownerId, this.ownToken).subscribe(observer);
  }
  filterPlaygrounds(): void {
    const currentUrl = this.router.url;

    if (currentUrl.endsWith('/playgrounds/unbookable')) {
      this.filterPgs(false, 1);
    } else if (currentUrl.endsWith('/playgrounds/bookable')) {
      this.filterPgs(true, 1);
    } else if (currentUrl.endsWith('/playgrounds/notAccepted')) {
      this.waitingPgs(2);
    }
  }
  addPg() {
    this.router.navigate(['/dashboard/playgrounds/add1'], {
      queryParams: { action: 'add' },
    });
  }
  updateData(e: any) {
    this.ngOnInit();
  }
  filterPgs(isBookable: boolean, isAcceptable: number) {
    this.filterdPGs = this.allPGs.filter(
      (item) =>
        item.playgroundInfo.playground?.isBookable === isBookable &&
        item.playgroundInfo.playground?.isAccepted === isAcceptable
    );
  }
  waitingPgs(isAcceptable: number) {
    this.filterdPGs = this.allPGs.filter(
      (item) => item.playgroundInfo.playground?.isAccepted === isAcceptable
    );
  }
}
