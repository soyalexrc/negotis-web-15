import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminCrearEditarComponent } from './superadmin-crear-editar.component';

describe('SuperadminCrearEditarComponent', () => {
  let component: SuperadminCrearEditarComponent;
  let fixture: ComponentFixture<SuperadminCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperadminCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
