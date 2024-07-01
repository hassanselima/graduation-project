import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '../../../services/file-upload.service';
import { SharedDataService } from '../../../services/shared-data.service';
import { error } from 'console';

@Component({
  selector: 'app-add-pg5',
  templateUrl: './add-pg5.component.html',
  styleUrl: './add-pg5.component.css',
})
export class AddPG5Component implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('fileInput2') fileInput2!:
    | ElementRef<HTMLInputElement>
    | undefined;

  uploadedImageFile: File | null = null;
  uploadedPaperFile: File | null = null;

  pgId: any | null;
  ownToken: string | null;
  msg: string = '';
  msg2: string = '';
  msgError: string = '';
  msg2Error: string = '';
  action: string = '';
  pgData: any;
  uploadedImage: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private fileSer: FileUploadService,
    private sharedSer: SharedDataService,
    private route: ActivatedRoute
  ) {
    const currentUser = localStorage.getItem('currentUser');
    this.ownToken = localStorage.getItem('ownerToken');
  }
  ngOnInit(): void {
    this.getRouteAction();
  }

  getRouteAction() {
    this.route.queryParams.subscribe((params) => {
      this.action = params['action'];
      console.log(this.action);
      if (this.action === 'edit') {
        console.log('edit playground page 5');
        this.pgData = this.sharedSer.getPgData();
        console.log(this.pgData);
        if (this.pgData) {
          this.pgId = this.pgData?.id;
          console.log('added pg Id : ', this.pgId);
          this.uploadedImage = this.getImage(this.pgData?.picture);
          console.log(this.uploadedImage);
        }
      }
    });
  }
  getImage(base64Image: string): string {
    return `data:image/jpeg;base64,${base64Image}`;
  }

  onFileSelected(event: any, isDocs: boolean): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const validFileTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      const maxFileSize = 10 * 1024 * 1024;
      if (!validFileTypes.includes(file.type)) {
        isDocs
          ? (this.msg2Error = 'نوع الملف غير صالح')
          : (this.msgError = 'نوع الملف غير صالح');
        this.msg = '';
        this.msg2 = '';
        return;
      }
      if (file.size > maxFileSize) {
        isDocs
          ? (this.msg2Error =
              'حجم الملف يتجاوز 10 ميغابايت. يرجى تحميل ملف أصغر.')
          : (this.msgError =
              'حجم الملف يتجاوز 10 ميغابايت. يرجى تحميل ملف أصغر.');

        this.msg = '';
        this.msg2 = '';
        return;
      }
      if (isDocs) {
        this.uploadedPaperFile = file;
      } else {
        this.uploadedImageFile = file;
      }
      this.msgError = '';
      this.msg2Error = '';
    }
  }
  delFile(isDocumentation: boolean) {
    if (isDocumentation) {
      this.uploadedPaperFile = null;
      this.msg2 = '';
      this.msg2Error = '';
    } else {
      this.uploadedImageFile = null;
      this.msg = '';
      this.msgError = '';
    }
    console.log('-----after');
    console.log(this.uploadedImageFile);
  }
  triggerFileInput(event: any, isDocumentation: boolean): void {
    if (event.target.innerText == 'اختيار ملف') {
      if (this.fileInput && !isDocumentation) {
        this.fileInput.nativeElement.click();
      } else if (this.fileInput2 && isDocumentation) {
        this.fileInput2.nativeElement.click();
      } else {
        console.error('File input element is not available');
      }
    } else if (event.target.innerText == 'تحميل') {
      const file = isDocumentation
        ? this.uploadedPaperFile
        : this.uploadedImageFile;

      const observer = {
        next: (res: any) => {
          if (res.message === 'Image Uploaded To Database') {
            if (isDocumentation) {
              this.msg2 = 'تم تحميل الصورة بنجاح';
              this.msg2Error = '';
            } else {
              this.msg = 'تم تحميل الصورة بنجاح';
              this.msgError = '';
            }
          }
        },
        error: (err: any) => {
          if (isDocumentation) {
            this.msg2 = 'حدث خطأ';
            this.msg = '';
          } else {
            this.msg = 'حدث خطأ';
            this.msg2 = '';
          }
        },
      };
      this.fileSer
        .uploadFile(this.pgId, isDocumentation, file, this.ownToken)
        .subscribe(observer);
    }
  }
  next() {
    console.log(this.uploadedImageFile);
    console.log(this.uploadedPaperFile);
    this.router.navigate(['/dashboard/playgrounds/add6'], {
      queryParams: { action: this.action },
    });
  }
}
