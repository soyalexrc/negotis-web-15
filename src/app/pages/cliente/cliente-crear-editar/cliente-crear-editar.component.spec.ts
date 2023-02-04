import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteCrearEditarComponent } from './cliente-crear-editar.component';

describe('ClienteCrearEditarComponent', () => {
  let component: ClienteCrearEditarComponent;
  let fixture: ComponentFixture<ClienteCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
