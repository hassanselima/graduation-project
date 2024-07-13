import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-add-pg2',
  templateUrl: './add-pg2.component.html',
  styleUrl: './add-pg2.component.css',
})
export class AddPG2Component implements OnInit {
  addPG2Form: FormGroup;
  action: string = '';
  pgData: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sharedData: SharedDataService
  ) {
    this.addPG2Form = fb.group({
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
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
          this.addPG2Form.patchValue({
            country: this.pgData.country,
            city: this.pgData.city,
            address: this.pgData.address,
          });
        }
      }
    });
  }
  next() {
    this.sharedData.setPgData({ ...this.addPG2Form.value });

    this.router.navigate(['/dashboard/playgrounds/add3'], {
      queryParams: { action: this.action },
    });
  }
  onChangeLocation(location: google.maps.LatLngLiteral) {
    this.addPG2Form.get('longitude')?.setValue(location.lng);
    this.addPG2Form.get('latitude')?.setValue(location.lat);
  }
}
