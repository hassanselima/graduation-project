import { TestBed } from '@angular/core/testing';

import { ReceivedDataService } from './received-data.service';

describe('ReceivedDataService', () => {
  let service: ReceivedDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceivedDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
