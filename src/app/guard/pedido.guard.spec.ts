import { TestBed, async, inject } from '@angular/core/testing';

import { PedidoGuard } from '../guard/pedido.guard';

describe('PedidoGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PedidoGuard]
    });
  });

  it('should ...', inject([PedidoGuard], (guard: PedidoGuard) => {
    expect(guard).toBeTruthy();
  }));
});
