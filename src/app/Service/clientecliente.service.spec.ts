import { TestBed } from '@angular/core/testing';

import { ClienteclienteService } from './clientecliente.service';

describe('ClienteclienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClienteclienteService = TestBed.get(ClienteclienteService);
    expect(service).toBeTruthy();
  });
});
