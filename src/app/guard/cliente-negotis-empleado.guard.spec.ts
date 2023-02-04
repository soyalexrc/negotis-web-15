import { TestBed, async, inject } from '@angular/core/testing';

import { ClienteNegotisEmpleadoGuard } from './cliente-negotis-empleado.guard';

describe('ClienteNegotisEmpleadoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClienteNegotisEmpleadoGuard]
    });
  });

  it('should ...', inject([ClienteNegotisEmpleadoGuard], (guard: ClienteNegotisEmpleadoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
