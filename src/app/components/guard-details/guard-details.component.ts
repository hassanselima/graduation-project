import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GuardServicesService } from '../../services/guard-services.service';

import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Component({
  selector: 'app-guard-details',
  templateUrl: './guard-details.component.html',
  styleUrl: './guard-details.component.css',
})
export class GuardDetailsComponent implements OnInit {
  @Input() guards: any;
  @Output() reloadGuards: EventEmitter<any> = new EventEmitter<any>();
  token: string | null = '';
  msg: string = '';
  msgError: string = '';
  constructor(
    private router: Router,
    private guardSer: GuardServicesService,
    public dialog: MatDialog
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
        this.msgError = '';
        this.msg = 'تم حذف الموظف بنجاح';
        console.log(this.msg);
        this.reloadGuards.emit();
        setTimeout(() => {
          this.msg = '';
        }, 3000);
      },
      error: (err: any) => {
        this.msg = '';
        this.msgError = err;
        console.log(this.msgError);
        setTimeout(() => {
          this.msgError = '';
        }, 3000);
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
