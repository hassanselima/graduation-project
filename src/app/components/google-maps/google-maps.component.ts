import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrl: './google-maps.component.css',
})
export class GoogleMapsComponent {
  @Output() locationChanged: EventEmitter<google.maps.LatLngLiteral>;
  center: google.maps.LatLngLiteral = {
    lat: 30.791830096528056,
    lng: 31.002590652724592,
  };
  zoom = 12;
  display: google.maps.LatLngLiteral | null = null;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
  };
  // markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPosition!: google.maps.LatLngLiteral;

  constructor() {
    this.locationChanged = new EventEmitter<google.maps.LatLngLiteral>();
  }
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.center = event.latLng.toJSON();
      this.markerPosition = event.latLng.toJSON();
      this.locationChanged.emit(this.markerPosition);
      console.log(this.markerPosition);
    }
  }

  move(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.display = event.latLng.toJSON();
    }
  }
}
