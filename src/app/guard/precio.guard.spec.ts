import { TestBed, async, inject } from '@angular/core/testing';

import { PrecioGuard } from './precio.guard';

describe('PrecioGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrecioGuard]
    });
  });

  it('should ...', inject([PrecioGuard], (guard: PrecioGuard) => {
    expect(guard).toBeTruthy();
  }));
});
