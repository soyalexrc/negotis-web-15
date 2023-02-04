import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalCrearEditarComponent } from './sucursal-crear-editar.component';

describe('SucursalCrearEditarComponent', () => {
  let component: SucursalCrearEditarComponent;
  let fixture: ComponentFixture<SucursalCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SucursalCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SucursalCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
