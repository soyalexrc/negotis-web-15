import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentadetalleCrearEditarComponent } from './cuentadetalle-crear-editar.component';

describe('CuentadetalleCrearEditarComponent', () => {
  let component: CuentadetalleCrearEditarComponent;
  let fixture: ComponentFixture<CuentadetalleCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentadetalleCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentadetalleCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
