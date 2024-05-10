import { Component, OnInit } from '@angular/core';
import { DashServicesService } from '../../services/dash-services.service';

@Component({
  selector: 'app-dash-playgrounds',
  templateUrl: './dash-playgrounds.component.html',
  styleUrl: './dash-playgrounds.component.css',
})
export class DashPlaygroundsComponent implements OnInit {
  ownerId: string | null = '';
  ownToken: string | null = '';
  allPGs: any[] = [];
  isLoading: boolean = false;
  constructor(private dashSer: DashServicesService) {
    this.ownerId = JSON.parse(
      localStorage.getItem('currentUser') || ''
    ).ownerID;
    this.ownToken = localStorage.getItem('ownerToken');
  }
  ngOnInit(): void {
    this.isLoading = true;
    const observer = (res: any) => {
      if (res) {
        this.allPGs = res.playgrounds;
      }
      console.log('from dash-PGs details : ', this.allPGs);
      this.isLoading = false;
    };
    (err: any) => {
      this.isLoading = false;
    };
    this.dashSer.playgrounds(this.ownerId, this.ownToken).subscribe(observer);
  }
  updateData(e: any) {
    this.ngOnInit();
  }
}
