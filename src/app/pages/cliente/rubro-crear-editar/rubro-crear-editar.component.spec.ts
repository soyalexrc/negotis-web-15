import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubroCrearEditarComponent } from './rubro-crear-editar.component';

describe('RubroCrearEditarComponent', () => {
  let component: RubroCrearEditarComponent;
  let fixture: ComponentFixture<RubroCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubroCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubroCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
