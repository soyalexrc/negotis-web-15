import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaDatosStatusModalComponent } from './factura-datos-status-modal.component';

describe('FacturaDatosStatusModalComponent', () => {
  let component: FacturaDatosStatusModalComponent;
  let fixture: ComponentFixture<FacturaDatosStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturaDatosStatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturaDatosStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
