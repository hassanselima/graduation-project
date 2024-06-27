import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pg4',
  templateUrl: './add-pg4.component.html',
  styleUrl: './add-pg4.component.css',
})
export class AddPG4Component {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement> | undefined;

  uploadedFile: File | null = null;

  constructor(private fb: FormBuilder, private router: Router) {}

  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadedFile = file;
    }
  }
  delFile() {
    this.uploadedFile = null;
    console.log('-----after');
    console.log(this.uploadedFile);
  }
  triggerFileInput(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    } else {
      console.error('File input element is not available');
    }
  }
  next() {
    console.log(this.uploadedFile);
  }
}
