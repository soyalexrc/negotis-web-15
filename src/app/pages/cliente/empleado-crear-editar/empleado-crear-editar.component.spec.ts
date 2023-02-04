import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoCrearEditarComponent } from './empleado-crear-editar.component';

describe('EmpleadoCrearEditarComponent', () => {
  let component: EmpleadoCrearEditarComponent;
  let fixture: ComponentFixture<EmpleadoCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
