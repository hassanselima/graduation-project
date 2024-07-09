import { TestBed } from '@angular/core/testing';

import { GuardServicesService } from './guard-services.service';

describe('GuardServicesService', () => {
  let service: GuardServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
