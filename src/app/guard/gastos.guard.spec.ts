import { TestBed, async, inject } from '@angular/core/testing';

import { GastosGuard } from './gastos.guard';

describe('GastosGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GastosGuard]
    });
  });

  it('should ...', inject([GastosGuard], (guard: GastosGuard) => {
    expect(guard).toBeTruthy();
  }));
});
