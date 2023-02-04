import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminInicioComponent } from './superadmin-inicio.component';

describe('SuperadminInicioComponent', () => {
  let component: SuperadminInicioComponent;
  let fixture: ComponentFixture<SuperadminInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperadminInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperadminInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
