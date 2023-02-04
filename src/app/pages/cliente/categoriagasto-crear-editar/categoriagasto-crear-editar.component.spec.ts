import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriagastoCrearEditarComponent } from './categoriagasto-crear-editar.component';

describe('CategoriagastoCrearEditarComponent', () => {
  let component: CategoriagastoCrearEditarComponent;
  let fixture: ComponentFixture<CategoriagastoCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriagastoCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriagastoCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
