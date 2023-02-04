import { TestBed } from '@angular/core/testing';

import { EstadoChequeService } from './estado-cheque.service';

describe('EstadoChequeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadoChequeService = TestBed.get(EstadoChequeService);
    expect(service).toBeTruthy();
  });
});
