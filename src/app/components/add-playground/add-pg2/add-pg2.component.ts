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
      console.log(this.action);
      if (this.action === 'edit') {
        console.log('edit playground page 2');
        this.pgData = this.sharedData.getPgDataEdit()?.playground;
        console.log(this.pgData);
        if (this.pgData) {
          this.addPG2Form.patchValue({
            country: this.pgData.country,
            city: this.pgData.city,
            address: this.pgData.address,
          });
        }
        console.log(this.addPG2Form.value);
      }
    });
  }
  next() {
    console.log('-------second page-------');
    console.log(this.addPG2Form.value);
    this.sharedData.setPgData({ ...this.addPG2Form.value });
    console.log(this.sharedData.getPgData());
    this.router.navigate(['/dashboard/playgrounds/add3'], {
      queryParams: { action: this.action },
    });
  }
  onChangeLocation(location: google.maps.LatLngLiteral) {
    console.log('on change location');
    console.log(location);
    this.addPG2Form.get('longitude')?.setValue(location.lng);
    this.addPG2Form.get('latitude')?.setValue(location.lat);
  }
}
