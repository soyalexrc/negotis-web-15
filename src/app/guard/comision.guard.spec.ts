import { TestBed, async, inject } from '@angular/core/testing';

import { ComisionGuard } from './comision.guard';

describe('ComisionGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComisionGuard]
    });
  });

  it('should ...', inject([ComisionGuard], (guard: ComisionGuard) => {
    expect(guard).toBeTruthy();
  }));
});
