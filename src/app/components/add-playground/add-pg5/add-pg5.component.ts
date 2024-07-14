import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../../services/shared-data.service';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-add-pg5',
  templateUrl: './add-pg5.component.html',
  styleUrl: './add-pg5.component.css',
})
export class AddPG5Component implements OnInit {
  pgId: any | null;
  ownToken: string | null;
  action: string = '';
  pgData: any;
  uploadedImage: any;

  constructor(
    private router: Router,
    private sharedSer: SharedDataService,
    private route: ActivatedRoute,
    private toastSer: ToastService
  ) {
    const currentUser = localStorage.getItem('currentUser');
    this.ownToken = localStorage.getItem('ownerToken');
  }

  ngOnInit(): void {
    this.getRouteAction();
  }

  getRouteAction(): void {
    this.route.queryParams.subscribe((params) => {
      this.action = params['action'];
      this.pgData = this.sharedSer.getPgData();

      if (this.pgData) {
        this.pgId = this.pgData?.id;
        this.uploadedImage = this.getImage(this.pgData?.picture);
      }
    });
  }

  getImage(base64Image: string): string {
    return `data:image/jpeg;base64,${base64Image}`;
  }

  onFileUploadSuccess(event: any, isDocs: boolean): void {
    if (isDocs) {
      this.toastSer.success('Document uploaded successfully');
    } else {
      this.toastSer.success('Image uploaded successfully');
    }
  }

  next(): void {
    this.router.navigate(['/dashboard/playgrounds/add6'], {
      queryParams: { action: this.action },
    });
  }
}
