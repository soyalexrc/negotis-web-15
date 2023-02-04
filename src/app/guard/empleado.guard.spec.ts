import { TestBed, async, inject } from '@angular/core/testing';

import { EmpleadoGuard } from './empleado.guard';

describe('EmpleadoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmpleadoGuard]
    });
  });

  it('should ...', inject([EmpleadoGuard], (guard: EmpleadoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
