import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoPanelComponent } from './pedido-panel.component';

describe('PedidoPanelComponent', () => {
  let component: PedidoPanelComponent;
  let fixture: ComponentFixture<PedidoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
