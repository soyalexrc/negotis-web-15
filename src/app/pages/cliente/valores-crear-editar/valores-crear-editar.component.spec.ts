import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresCrearEditarComponent } from './valores-crear-editar.component';

describe('ValoresCrearEditarComponent', () => {
  let component: ValoresCrearEditarComponent;
  let fixture: ComponentFixture<ValoresCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoresCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoresCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
