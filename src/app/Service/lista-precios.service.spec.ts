import { TestBed } from '@angular/core/testing';

import { ListaPreciosService } from './lista-precios.service';

describe('ListaPreciosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListaPreciosService = TestBed.get(ListaPreciosService);
    expect(service).toBeTruthy();
  });
});
