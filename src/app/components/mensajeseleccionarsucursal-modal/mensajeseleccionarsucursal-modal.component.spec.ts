import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeseleccionarsucursalModalComponent } from './mensajeseleccionarsucursal-modal.component';

describe('MensajeseleccionarsucursalModalComponent', () => {
  let component: MensajeseleccionarsucursalModalComponent;
  let fixture: ComponentFixture<MensajeseleccionarsucursalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeseleccionarsucursalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeseleccionarsucursalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
