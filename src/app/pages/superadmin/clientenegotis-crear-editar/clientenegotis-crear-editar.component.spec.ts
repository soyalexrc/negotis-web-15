import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientenegotisCrearEditarComponent } from './clientenegotis-crear-editar.component';

describe('ClientenegotisCrearEditarComponent', () => {
  let component: ClientenegotisCrearEditarComponent;
  let fixture: ComponentFixture<ClientenegotisCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientenegotisCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientenegotisCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
