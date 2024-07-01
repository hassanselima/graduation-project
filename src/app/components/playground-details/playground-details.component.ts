import { Component, Input, OnInit, Output } from '@angular/core';
import { DashServicesService } from '../../services/dash-services.service';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-playground-details',
  templateUrl: './playground-details.component.html',
  styleUrl: './playground-details.component.css',
})
export class PlaygroundDetailsComponent implements OnInit {
  daysOfWeek: string[][] = [
    ['الأحد', 'Sunday'],
    ['الاثنين', 'Monday'],
    ['الثلاثاء', 'Tuesday'],
    ['الأربعاء', 'Wednesday'],
    ['الخميس', 'Thursday'],
    ['الجمعة', 'Friday'],
    ['السبت', 'Saturday'],
  ];
  advantages: string[] = [
    'مواقف سيارات',
    'غرف تبديل الملابس',
    'اضاءة',
    'واي فاي',
    'إسعاف وطوارئ',
    'عشب',
    'مرافق صحية',
  ];

  holidays: string = '';
  ownerId: string | null = '';
  ownToken: string | null = '';
  imageSrc: string | undefined = '';
  @Input() allPGs: any[] = [];
  @Output() reloaddata: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private dashSer: DashServicesService,
    private router: Router,
    private sharedData: SharedDataService
  ) {
    this.ownerId = JSON.parse(
      localStorage.getItem('currentUser') || ''
    ).ownerID;
    this.ownToken = localStorage.getItem('ownerToken');
  }
  ngOnInit(): void {
    console.log('from PG details component', this.allPGs);
  }
  isDayInHolidays(day: string, holidays: string) {
    this.holidays = holidays;
    return !this.holidays?.includes(day);
  }
  changeState(id: number, currState: Boolean) {
    this.dashSer.changeState(id, !currState, this.ownToken).subscribe(() => {
      console.log('not bookable from my playgrounds');
      this.reloaddata.emit();
      if (currState) {
        this.router.navigate(['/dashboard/playgrounds/bookable']);
      } else {
        this.router.navigate(['/dashboard/playgrounds/unbookable']);
      }
    });
    console.log(id);
  }
  getImage(base64Image: string): string {
    return `data:image/jpeg;base64,${base64Image}`;
  }
  formatOpeningHours(openingHours: string | undefined, index: number) {
    if (!openingHours) return '';
    const hours = parseInt(openingHours.split(':')[index], 10);
    // const suffix = hours < 12 ? 'AM' : 'PM';
    // const formattedHours = hours % 12 || 12;
    return `${hours == 24 ? '00' : hours}:00`;
  }
  deletePG(id: number) {
    console.log(id);
    const observer = {
      next: (response: any) => {
        console.log('Playground deleted successfully', response);
        this.reloaddata.emit();
      },
      error: (err: any) => {
        console.error('Error deleting playground', err);
      },
    };
    this.dashSer.deletePlayground(id, this.ownToken).subscribe(observer);
  }
  edit(id: number, data: any) {
    console.log(id);
    console.log(data);
    this.sharedData.setPgDataEdit(data);
    this.router.navigate(['/dashboard/playgrounds/add1'], {
      queryParams: { action: 'edit' },
    });
  }
}
