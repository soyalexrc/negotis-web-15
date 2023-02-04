import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaCrearEditarComponent } from './zona-crear-editar.component';

describe('ZonaCrearEditarComponent', () => {
  let component: ZonaCrearEditarComponent;
  let fixture: ComponentFixture<ZonaCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonaCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
