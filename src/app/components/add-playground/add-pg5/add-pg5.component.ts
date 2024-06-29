import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pg5',
  templateUrl: './add-pg5.component.html',
  styleUrl: './add-pg5.component.css',
})
export class AddPG5Component {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement> | undefined;

  uploadedImageFile: File | null = null;
  uploadedPaperFile: File | null = null;

  constructor(private fb: FormBuilder, private router: Router) {}

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadedImageFile = file;
    }
  }
  delFile() {
    this.uploadedImageFile = null;
    console.log('-----after');
    console.log(this.uploadedImageFile);
  }
  triggerFileInput(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    } else {
      console.error('File input element is not available');
    }
  }
  next() {
    console.log(this.uploadedImageFile);
  }
}
