import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaCrearEditarComponent } from './ruta-crear-editar.component';

describe('RutaCrearEditarComponent', () => {
  let component: RutaCrearEditarComponent;
  let fixture: ComponentFixture<RutaCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
