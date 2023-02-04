import { TestBed } from '@angular/core/testing';

import { CuentaFinanzaDetalleService } from './cuenta-finanza-detalle.service';

describe('CuentaFinanzaDetalleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentaFinanzaDetalleService = TestBed.get(CuentaFinanzaDetalleService);
    expect(service).toBeTruthy();
  });
});
