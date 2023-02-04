import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapreciosCrearEditarComponent } from './listaprecios-crear-editar.component';

describe('ListapreciosCrearEditarComponent', () => {
  let component: ListapreciosCrearEditarComponent;
  let fixture: ComponentFixture<ListapreciosCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListapreciosCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListapreciosCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
