import { TestBed } from '@angular/core/testing';

import { CategoriaGastoService } from './categoriagasto.service';

describe('CategoriaGastoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriaGastoService = TestBed.get(CategoriaGastoService);
    expect(service).toBeTruthy();
  });
});
