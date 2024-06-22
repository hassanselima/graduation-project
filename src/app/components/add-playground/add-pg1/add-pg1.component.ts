import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-pg1',
  templateUrl: './add-pg1.component.html',
  styleUrl: './add-pg1.component.css',
})
export class AddPG1Component {
  addPGForm: FormGroup;
  selectedFieldSize: string = '';
  fieldSizes: string[] = ['5X5', '6X6', '7X7', '8X8', '9X9', '11X11'];
  constructor(private fb: FormBuilder, private router: Router) {
    this.addPGForm = fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  selectFieldSize(size: string) {
    this.selectedFieldSize = size;
    this.addPGForm.get('type')?.setValue(size);
  }
  addFieldSize() {
    const newSize = prompt('Enter new field size (e.g., 4X4): ');
    if (newSize) {
      this.fieldSizes.push(newSize.toUpperCase());
    }
  }
  next() {
    console.log('-------first page-------');
    console.log(this.addPGForm.value);
    this.router.navigate(['/dashboard/playgrounds/add2']);
  }
}
