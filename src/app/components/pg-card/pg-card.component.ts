import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashServicesService } from '../../services/dash-services.service';

@Component({
  selector: 'app-pg-card',
  templateUrl: './pg-card.component.html',
  styleUrl: './pg-card.component.css',
})
export class PgCardComponent implements OnInit {
  @Input() bookablePlaygrounds: any[] = [];
  @Output() updateComponent: EventEmitter<void> = new EventEmitter<void>();
  token: string | null = '';
  constructor(private dashSer: DashServicesService) {
    this.token = localStorage.getItem('ownerToken');
  }
  ngOnInit(): void {}

  changeState(id: number) {
    this.dashSer.changeState(id, false, this.token).subscribe(() => {
      this.updateComponent.emit();
    });
  }
  getImage(base64Image: string): string {
    return `data:image/jpeg;base64,${base64Image}`;
  }
}
