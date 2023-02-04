import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosCrearEditarComponent } from './gastos-crear-editar.component';

describe('GastosCrearEditarComponent', () => {
  let component: GastosCrearEditarComponent;
  let fixture: ComponentFixture<GastosCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
