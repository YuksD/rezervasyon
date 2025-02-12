import { TestBed } from '@angular/core/testing';

import { KortDataService } from './kort-data.service';

describe('KortDataService', () => {
  let service: KortDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KortDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
