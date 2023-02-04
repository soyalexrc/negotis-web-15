import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidofaltandatosrequeridosModalComponent } from './pedidofaltandatosrequeridos-modal.component';

describe('PedidofaltandatosrequeridosModalComponent', () => {
  let component: PedidofaltandatosrequeridosModalComponent;
  let fixture: ComponentFixture<PedidofaltandatosrequeridosModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidofaltandatosrequeridosModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidofaltandatosrequeridosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
