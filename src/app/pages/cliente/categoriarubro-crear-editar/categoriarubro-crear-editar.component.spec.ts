import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriarubroCrearEditarComponent } from './categoriarubro-crear-editar.component';

describe('CategoriarubroCrearEditarComponent', () => {
  let component: CategoriarubroCrearEditarComponent;
  let fixture: ComponentFixture<CategoriarubroCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriarubroCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriarubroCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
