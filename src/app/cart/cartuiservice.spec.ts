import { TestBed } from '@angular/core/testing';

import { Cartuiservice } from './cartuiservice';

describe('Cartuiservice', () => {
  let service: Cartuiservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cartuiservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
