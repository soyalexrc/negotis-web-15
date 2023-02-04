import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DespachoPedidoPanelComponent } from './despacho-pedido-panel.component';

describe('DespachoPedidoPanelComponent', () => {
  let component: DespachoPedidoPanelComponent;
  let fixture: ComponentFixture<DespachoPedidoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DespachoPedidoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DespachoPedidoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
