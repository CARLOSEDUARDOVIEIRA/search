import { TestBed, inject } from '@angular/core/testing';

import { ServiceRootService } from './service-root.service';
import { HttpClientModule, HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServiceRootService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule ],
      providers: [ServiceRootService]
    });
  });

  it('should be created', inject([ServiceRootService], (service: ServiceRootService) => {
    expect(service).toBeTruthy();
  }));
});
