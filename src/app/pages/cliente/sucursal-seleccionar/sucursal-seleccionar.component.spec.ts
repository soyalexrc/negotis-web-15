import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalSeleccionarComponent } from './sucursal-seleccionar.component';

describe('SucursalSeleccionarComponent', () => {
  let component: SucursalSeleccionarComponent;
  let fixture: ComponentFixture<SucursalSeleccionarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalSeleccionarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalSeleccionarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
