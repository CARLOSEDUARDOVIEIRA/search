import { TestBed, inject } from '@angular/core/testing';

import { ServiceRootService } from './service-root.service';

describe('ServiceRootService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceRootService]
    });
  });

  it('should be created', inject([ServiceRootService], (service: ServiceRootService) => {
    expect(service).toBeTruthy();
  }));
});
