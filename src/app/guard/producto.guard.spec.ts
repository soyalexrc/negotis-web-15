import { TestBed, async, inject } from '@angular/core/testing';

import { ProductoGuard } from './producto.guard';

describe('ProductoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductoGuard]
    });
  });

  it('should ...', inject([ProductoGuard], (guard: ProductoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
