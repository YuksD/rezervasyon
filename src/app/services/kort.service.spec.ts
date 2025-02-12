import { TestBed } from '@angular/core/testing';

import { KortService } from './kort.service';

describe('KortService', () => {
  let service: KortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
