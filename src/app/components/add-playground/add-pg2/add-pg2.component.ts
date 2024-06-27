import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedDataService } from '../../../services/shared-data.service';

@Component({
  selector: 'app-add-pg2',
  templateUrl: './add-pg2.component.html',
  styleUrl: './add-pg2.component.css',
})
export class AddPG2Component implements OnInit {
  addPG2Form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
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
  ngOnInit(): void {}

  next() {
    console.log('-------second page-------');
    console.log(this.addPG2Form.value);
    this.sharedData.setPgData({ ...this.addPG2Form.value });
    this.router.navigate(['/dashboard/playgrounds/add3']);
    // console.log(this.workingDays);
    // console.log(this.holidays);
  }
  onChangeLocation(location: google.maps.LatLngLiteral) {
    console.log('on change location');
    console.log(location);
    this.addPG2Form.get('longitude')?.setValue(location.lng);
    this.addPG2Form.get('latitude')?.setValue(location.lat);
  }
}
