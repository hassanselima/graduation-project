import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-add-pg1',
  templateUrl: './add-pg1.component.html',
  styleUrl: './add-pg1.component.css',
})
export class AddPG1Component implements OnInit {
  addPGForm: FormGroup;
  selectedFieldSize: string = '';
  fieldSizes: string[] = ['5X5', '6X6', '7X7', '8X8', '9X9', '11X11'];
  action: string = '';
  pgName: string = '';
  pgData: any = {};
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedData: SharedDataService
  ) {
    this.addPGForm = fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getRouteAction();
  }

  getRouteAction() {
    this.route.queryParams.subscribe((params) => {
      this.action = params['action'];

      if (this.action === 'edit') {
        this.pgData = this.sharedData.getPgDataEdit()?.playground;

        if (this.pgData) {
          this.addPGForm.patchValue({
            name: this.pgData.name,
            description: this.pgData.description,
            type: this.pgData.type,
          });
          this.pgName = this.pgData.name;
          this.setFieldSize(this.pgData?.type.toString());
        }
      }
    });
  }
  setFieldSize(type: any) {
    this.selectedFieldSize = type;
  }
  selectFieldSize(size: string) {
    this.selectedFieldSize = size;
    this.addPGForm.get('type')?.setValue(Number(size));
  }
  addFieldSize() {
    const newSize = prompt('Enter new field size (e.g., 4X4): ');
    if (newSize) {
      this.fieldSizes.push(newSize.toUpperCase());
    }
  }
  next() {
    this.sharedData.setPgData({ ...this.addPGForm.value });
    this.router.navigate(['/dashboard/playgrounds/add2'], {
      queryParams: { action: this.action },
    });
  }
}
