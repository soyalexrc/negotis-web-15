import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaCrearEditarComponent } from './marca-crear-editar.component';

describe('MarcaCrearEditarComponent', () => {
  let component: MarcaCrearEditarComponent;
  let fixture: ComponentFixture<MarcaCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcaCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
