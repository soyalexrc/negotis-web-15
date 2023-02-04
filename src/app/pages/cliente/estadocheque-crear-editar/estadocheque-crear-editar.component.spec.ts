import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadochequeCrearEditarComponent } from './estadocheque-crear-editar.component';

describe('EstadochequeCrearEditarComponent', () => {
  let component: EstadochequeCrearEditarComponent;
  let fixture: ComponentFixture<EstadochequeCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadochequeCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadochequeCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
