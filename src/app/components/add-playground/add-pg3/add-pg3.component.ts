import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pg3',
  templateUrl: './add-pg3.component.html',
  styleUrl: './add-pg3.component.css',
})
export class AddPG3Component {
  // @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement> | undefined;
  advantages: string[] = [
    'مرافق صحية',
    'مواقف سيارات',
    'غرف تبديل الملابس',
    'اضاءة',
    'واي فاي',
    'إسعاف وطوارئ',
    'عشب',
  ];
  selectedAdvs: string[] = [];
  uploadedFiles: File[] = [];

  addPG3Form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.addPG3Form = fb.group({
      feesForHour: ['', [Validators.required]],
      advantages: ['', [Validators.required]],
    });
  }
  selectadv(adv: string) {
    const index = this.selectedAdvs.indexOf(adv);
    if (index > -1) {
      this.selectedAdvs.splice(index, 1);
    } else {
      this.selectedAdvs.push(adv);
    }
    this.addPG3Form.get('advantages')?.setValue(this.selectedAdvs);
    console.log(this.selectedAdvs);
  }
  addadv() {
    const newAdv = prompt('Enter new advantage: ');
    if (newAdv) {
      this.advantages.push(newAdv);
    }
  }
  onFileSelected(event: any): void {
    // const file: File = event.target.files[0];
    // if (file) {
    //   this.selectedFile = file;
    // }
    const files: FileList = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        this.uploadedFiles.push(files[i]);
      }
    }
  }
  delFile(fileName: File) {
    const idx = this.uploadedFiles.indexOf(fileName);
    this.uploadedFiles.splice(idx, 1);
    console.log('-----after');
    console.log(this.uploadedFiles);
  }
  // triggerFileInput(): void {
  //   if (this.fileInput) {
  //     this.fileInput.nativeElement.click();
  //   } else {
  //     console.error('File input element is not available');
  //   }
  // }
  next() {}
}
