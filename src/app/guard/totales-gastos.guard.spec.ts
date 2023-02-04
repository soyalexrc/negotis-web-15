import { TestBed, async, inject } from '@angular/core/testing';

import { TotalesGastosGuard } from './totales-gastos.guard';

describe('TotalesGastosGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TotalesGastosGuard]
    });
  });

  it('should ...', inject([TotalesGastosGuard], (guard: TotalesGastosGuard) => {
    expect(guard).toBeTruthy();
  }));
});
