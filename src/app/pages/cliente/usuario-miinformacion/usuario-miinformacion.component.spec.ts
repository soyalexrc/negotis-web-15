import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioMiinformacionComponent } from './usuario-miinformacion.component';

describe('UsuarioMiinformacionComponent', () => {
  let component: UsuarioMiinformacionComponent;
  let fixture: ComponentFixture<UsuarioMiinformacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioMiinformacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioMiinformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
