import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GuardServicesService } from '../../services/guard-services.service';
import { SharedDataService } from '../../services/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-employees-p2',
  templateUrl: './employees-p2.component.html',
  styleUrl: './employees-p2.component.css',
})
export class EmployeesP2Component implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement> | undefined;

  uploadedImageFile: File | null = null;
  guardId: string | null = '';
  ownerToken: string | null = '';
  action: string = '';
  constructor(
    private guardSer: GuardServicesService,
    private sharSer: SharedDataService,
    private router: Router,
    private route: ActivatedRoute,
    private toastSer: ToastService
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.action = params['action'];
    });
    this.ownerToken = localStorage.getItem('ownerToken');
    if (this.action === 'add') {
      this.guardId = this.sharSer.getguardData().guardId;
    } else if (this.action === 'edit') {
      this.guardId = this.sharSer.getguardId();
    }
  }
  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      const maxFileSize = 10 * 1024 * 1024;
      if (!validFileTypes.includes(file.type)) {
        this.toastSer.error('Invalid file type');
        return;
      }
      if (file.size > maxFileSize) {
        this.toastSer.error(
          'File size exceeds 10 MB. Please upload a smaller file'
        );
        return;
      }
      this.uploadedImageFile = file;
    }
  }
  delFile() {
    this.uploadedImageFile = null;
  }
  triggerFileInput(event: any): void {
    if (event.target.innerText == 'اختيار ملف') {
      if (this.fileInput) {
        this.fileInput.nativeElement.click();
      } else {
      }
    } else if (event.target.innerText == 'تحميل') {
      this.uploadedImageFile;

      const observer = {
        next: (res: any) => {
          if (res.message === 'Image Uploaded To Database') {
            this.action === 'add'
              ? this.toastSer.success('Gurad image added successfully!')
              : this.toastSer.success('Gurad image changed successfully!');
            this.router.navigate(['/dashboard/allemployees']);
          }
        },
        error: (err: any) => {
          this.toastSer.error(err);
          this.router.navigate(['/dashboard/allemployees']);
        },
      };
      this.guardSer
        .uploadImage(this.guardId, this.uploadedImageFile, this.ownerToken)
        .subscribe(observer);
    }
  }
}
