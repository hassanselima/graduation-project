import { Component, OnInit } from '@angular/core';
import { DashServicesService } from '../../services/dash-services.service';

@Component({
  selector: 'app-dash-overview',
  templateUrl: './dash-overview.component.html',
  styleUrls: ['./dash-overview.component.css'],
})
export class DashOverviewComponent implements OnInit {
  response: any;
  ownerId: string | null = '';
  ownToken: string | null = '';
  isLoading: boolean = false;
  isLoadingPG: boolean = false;
  bookingsByDay: { dayOfWeek: string; numberOfBookings: number }[] = [];
  monthlySum: { year: number; month: number; total: number }[] = [];

  bookablePlaygrounds: any[] = [];
  finshedBookings: number = 0;
  newBookings: number = 0;
  constructor(private dashservice: DashServicesService) {
    this.ownerId = JSON.parse(
      localStorage.getItem('currentUser') || ''
    ).ownerID;
    this.ownToken = localStorage.getItem('ownerToken');
  }
  ngOnInit(): void {
    this.getStats();
    this.getPlaygrounds();
  }
  getStats() {
    this.isLoading = true;
    const observer = (res: any) => {
      if (res) {
        this.bookingsByDay = res['bookingsByDayOfWeek'];
        this.monthlySum = res['monthlySum'];
      }
      this.isLoading = false;
    };
    (err: any) => {
      this.isLoading = false;
    };
    this.dashservice.stats(this.ownerId, this.ownToken).subscribe(observer);
  }
  getPlaygrounds() {
    this.isLoadingPG = true;
    const observer = (res: any) => {
      if (res) {
        this.finshedBookings = res.totalFinishedBookins;
        this.newBookings = res.totalNewBookings;
        this.bookablePlaygrounds = res.playgrounds.filter((item: any) => {
          return item.playgroundInfo.playground?.isBookable == true;
        });
      }

      this.isLoadingPG = false;
    };
    (err: any) => {
      this.isLoadingPG = false;
    };
    this.dashservice
      .playgrounds(this.ownerId, this.ownToken)
      .subscribe(observer);
  }
  updatePGs(e: void) {
    this.getStats();
  }
}
