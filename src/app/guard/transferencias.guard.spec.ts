import { TestBed, async, inject } from '@angular/core/testing';

import { TransferenciasGuard } from './transferencias.guard';

describe('TransferenciasGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransferenciasGuard]
    });
  });

  it('should ...', inject([TransferenciasGuard], (guard: TransferenciasGuard) => {
    expect(guard).toBeTruthy();
  }));
});
