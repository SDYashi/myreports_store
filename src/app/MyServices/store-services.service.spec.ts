import { TestBed } from '@angular/core/testing';

import { StoreServicesService } from './store-services.service';

describe('StoreServicesService', () => {
  let service: StoreServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
