import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfipCrearEditarComponent } from './afip-crear-editar.component';

describe('AfipCrearEditarComponent', () => {
  let component: AfipCrearEditarComponent;
  let fixture: ComponentFixture<AfipCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfipCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfipCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
