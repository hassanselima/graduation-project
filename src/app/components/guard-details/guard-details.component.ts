import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GuardServicesService } from '../../services/guard-services.service';

import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-guard-details',
  templateUrl: './guard-details.component.html',
  styleUrl: './guard-details.component.css',
})
export class GuardDetailsComponent implements OnInit {
  @Input() guards: any;
  @Output() reloadGuards: EventEmitter<any> = new EventEmitter<any>();
  token: string | null = '';

  constructor(
    private router: Router,
    private guardSer: GuardServicesService,
    public dialog: MatDialog,
    private toastSer: ToastService
  ) {}
  ngOnInit(): void {
    this.token = localStorage.getItem('ownerToken');
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
  delGuard(guardId: string) {
    console.log(guardId);
    const observer = {
      next: (res: any) => {
        this.reloadGuards.emit();
        this.toastSer.success('the employee deleted successfully');
      },
      error: (err: any) => {
        this.toastSer.error(err);
      },
    };
    this.guardSer.delGuard(guardId, this.token).subscribe(observer);
  }
  openDeleteModal(guardId: string): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '40%',
      data: { who: 'guard' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.delGuard(guardId);
        console.log('Confirmed deletion');
      } else {
        console.log('Cancelled deletion');
      }
    });
  }
}
