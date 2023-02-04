import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCrearEditarComponent } from './tarjeta-crear-editar.component';

describe('TarjetaCrearEditarComponent', () => {
  let component: TarjetaCrearEditarComponent;
  let fixture: ComponentFixture<TarjetaCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
