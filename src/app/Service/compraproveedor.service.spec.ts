import { TestBed } from '@angular/core/testing';

import { CompraproveedorService } from './compraproveedor.service';

describe('CompraproveedorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompraproveedorService = TestBed.get(CompraproveedorService);
    expect(service).toBeTruthy();
  });
});
