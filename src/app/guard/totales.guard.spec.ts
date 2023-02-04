import { TestBed, async, inject } from '@angular/core/testing';

import { TotalesGuard } from './totales.guard';

describe('TotalesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TotalesGuard]
    });
  });

  it('should ...', inject([TotalesGuard], (guard: TotalesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
