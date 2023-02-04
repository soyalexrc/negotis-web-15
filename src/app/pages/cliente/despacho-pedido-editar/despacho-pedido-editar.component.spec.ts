import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespachoPedidoEditarComponent } from './despacho-pedido-editar.component';

describe('DespachoPedidoEditarComponent', () => {
  let component: DespachoPedidoEditarComponent;
  let fixture: ComponentFixture<DespachoPedidoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespachoPedidoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespachoPedidoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
