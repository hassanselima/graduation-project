import { Component, Input, OnInit, Output } from '@angular/core';
import { DashServicesService } from '../../services/dash-services.service';
import { EventEmitter } from '@angular/core';

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
  @Input() allPGs: any[] = [];
  @Output() reloaddata: EventEmitter<any> = new EventEmitter<any>();
  constructor(private dashSer: DashServicesService) {
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
    return this.holidays?.includes(day);
  }
  changeState(id: number, currState: Boolean) {
    this.dashSer.changeState(id, !currState, this.ownToken).subscribe(() => {
      console.log('not bookable from my playgrounds');
      this.reloaddata.emit();
    });
    console.log(id);
  }
}
