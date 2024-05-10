import { TestBed } from '@angular/core/testing';

import { DashServicesService } from './dash-services.service';

describe('DashServicesService', () => {
  let service: DashServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
