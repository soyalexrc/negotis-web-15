import { TestBed } from '@angular/core/testing';

import { CategotriaRubroService } from './categotria-rubro.service';

describe('CategotriaRubroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategotriaRubroService = TestBed.get(CategotriaRubroService);
    expect(service).toBeTruthy();
  });
});
