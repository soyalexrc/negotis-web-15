import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoHistorialModalComponent } from './pago-historial-modal.component';

describe('PagoHistorialModalComponent', () => {
  let component: PagoHistorialModalComponent;
  let fixture: ComponentFixture<PagoHistorialModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagoHistorialModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoHistorialModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
