import { TestBed, async, inject } from '@angular/core/testing';

import { DespachoGuard } from './despacho.guard';

describe('DespachoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DespachoGuard]
    });
  });

  it('should ...', inject([DespachoGuard], (guard: DespachoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
