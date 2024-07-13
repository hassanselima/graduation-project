import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from '../../../services/file-upload.service';
import { SharedDataService } from '../../../services/shared-data.service';
import { error } from 'console';
import { ToastService } from 'angular-toastify';

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
    private route: ActivatedRoute,
    private toastSer: ToastService
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

      if (this.action === 'edit') {
        this.pgData = this.sharedSer.getPgData();

        if (this.pgData) {
          this.pgId = this.pgData?.id;
          this.uploadedImage = this.getImage(this.pgData?.picture);
        }
      } else {
        const pgData: any = this.sharedSer.getPgData();
        this.pgId = pgData.id;
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
        this.toastSer.error('Invalid file type');
        return;
      }
      if (file.size > maxFileSize) {
        this.toastSer.error(
          'File size exceeds 10 MB. Please upload a smaller file'
        );
        return;
      }
      if (isDocs) {
        this.uploadedPaperFile = file;
      } else {
        this.uploadedImageFile = file;
      }
    }
  }
  delFile(isDocumentation: boolean) {
    if (isDocumentation) {
      this.uploadedPaperFile = null;
    } else {
      this.uploadedImageFile = null;
    }
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
            this.toastSer.success('Image uploaded successfully');
          }
        },
        error: (err: any) => {
          this.toastSer.error('an error occurred');
        },
      };
      this.fileSer
        .uploadFile(this.pgId, isDocumentation, file, this.ownToken)
        .subscribe(observer);
    }
  }
  next() {
    this.router.navigate(['/dashboard/playgrounds/add6'], {
      queryParams: { action: this.action },
    });
  }
}
