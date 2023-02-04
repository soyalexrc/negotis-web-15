import { TestBed } from '@angular/core/testing';

import { TransferenciaDineroService } from './transferencia-dinero.service';

describe('TransferenciaDineroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransferenciaDineroService = TestBed.get(TransferenciaDineroService);
    expect(service).toBeTruthy();
  });
});
