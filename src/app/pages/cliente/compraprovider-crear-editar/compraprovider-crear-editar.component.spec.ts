import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraproviderCrearEditarComponent } from './compraprovider-crear-editar.component';

describe('CompraproviderCrearEditarComponent', () => {
  let component: CompraproviderCrearEditarComponent;
  let fixture: ComponentFixture<CompraproviderCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraproviderCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraproviderCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
