import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ToastService } from 'angular-toastify';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.css',
})
export class FileUploaderComponent {
  @Input() isDoc!: boolean;
  @Input() label!: string;
  @Input() pgId!: any;
  @Input() ownToken!: string | null;
  @Output() fileUploaded = new EventEmitter<boolean>();

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  uploadedFile: File | null = null;

  constructor(
    private toastSer: ToastService,
    private fileSer: FileUploadService
  ) {}

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
      this.uploadedFile = file;
    }
  }

  delFile(): void {
    this.uploadedFile = null;
  }

  triggerFileInput(event: any): void {
    if (event.target.innerText === 'اختيار ملف') {
      this.fileInput.nativeElement.click();
    } else if (event.target.innerText === 'تحميل') {
      const observer = {
        next: (res: any) => {
          if (res.message === 'Image Uploaded To Database') {
            this.fileUploaded.emit(true);
          }
        },
        error: (err: any) => {
          this.toastSer.error('an error occurred');
        },
      };
      this.fileSer
        .uploadFile(this.pgId, this.isDoc, this.uploadedFile, this.ownToken)
        .subscribe(observer);
    }
  }
}
