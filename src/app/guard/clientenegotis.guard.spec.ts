import { TestBed, async, inject } from '@angular/core/testing';

import { ClientenegotisGuard } from './clientenegotis.guard';

describe('ClientenegotisGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientenegotisGuard]
    });
  });

  it('should ...', inject([ClientenegotisGuard], (guard: ClientenegotisGuard) => {
    expect(guard).toBeTruthy();
  }));
});
