import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCrearEditarComponent } from './pedido-crear-editar.component';

describe('PedidoCrearEditarComponent', () => {
  let component: PedidoCrearEditarComponent;
  let fixture: ComponentFixture<PedidoCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
