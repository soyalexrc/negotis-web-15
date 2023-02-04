import { TestBed } from '@angular/core/testing';

import { AfipService } from './afip.service';

describe('AfipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AfipService = TestBed.get(AfipService);
    expect(service).toBeTruthy();
  });
});
