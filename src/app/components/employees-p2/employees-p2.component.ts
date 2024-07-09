import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GuardServicesService } from '../../services/guard-services.service';
import { SharedDataService } from '../../services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-p2',
  templateUrl: './employees-p2.component.html',
  styleUrl: './employees-p2.component.css',
})
export class EmployeesP2Component implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement> | undefined;
  msg: string = '';
  msgError: string = '';
  uploadedImageFile: File | null = null;
  guardId: string | null = '';
  ownerToken: string | null = '';
  constructor(
    private guardSer: GuardServicesService,
    private sharSer: SharedDataService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.guardId = this.sharSer.getguardData().guardId;
    this.ownerToken = localStorage.getItem('ownerToken');
  }
  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      const maxFileSize = 10 * 1024 * 1024;
      if (!validFileTypes.includes(file.type)) {
        this.msgError = 'نوع الملف غير صالح';
        this.msg = '';
        return;
      }
      if (file.size > maxFileSize) {
        this.msgError = 'حجم الملف يتجاوز 10 ميغابايت. يرجى تحميل ملف أصغر.';

        this.msg = '';
        return;
      }
      this.uploadedImageFile = file;
      this.msgError = '';
    }
  }
  delFile() {
    this.uploadedImageFile = null;
    this.msg = '';
    this.msgError = '';

    console.log('-----after');
    console.log(this.uploadedImageFile);
  }
  triggerFileInput(event: any): void {
    if (event.target.innerText == 'اختيار ملف') {
      if (this.fileInput) {
        this.fileInput.nativeElement.click();
      } else {
        console.error('File input element is not available');
      }
    } else if (event.target.innerText == 'تحميل') {
      this.uploadedImageFile;

      const observer = {
        next: (res: any) => {
          if (res.message === 'Image Uploaded To Database') {
            this.msg = 'تم تحميل الصورة بنجاح';
            this.msgError = '';
            setTimeout(() => {
              this.msg = '';
            }, 3000);
          }
        },
        error: (err: any) => {
          this.msgError = 'حدث خطأ';
          this.msg = '';
          setTimeout(() => {
            this.msgError = '';
          }, 3000);
        },
      };
      this.guardSer
        .uploadImage(this.guardId, this.uploadedImageFile, this.ownerToken)
        .subscribe(observer);
    }
  }
  next() {
    this.router.navigate(['/dashboard/allemployees']);
  }
}
