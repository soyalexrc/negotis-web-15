import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaConfiguracionComponent } from './caja-configuracion.component';

describe('CajaConfiguracionComponent', () => {
  let component: CajaConfiguracionComponent;
  let fixture: ComponentFixture<CajaConfiguracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaConfiguracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
