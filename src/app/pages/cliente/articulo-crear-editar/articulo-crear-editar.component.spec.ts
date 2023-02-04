import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCrearEditarComponent } from './articulo-crear-editar.component';

describe('ArticuloCrearEditarComponent', () => {
  let component: ArticuloCrearEditarComponent;
  let fixture: ComponentFixture<ArticuloCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
