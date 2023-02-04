import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanzasSetEstadoMasivoComponent } from './finanzas-set-estado-masivo.component';

describe('FinanzasSetEstadoMasivoComponent', () => {
  let component: FinanzasSetEstadoMasivoComponent;
  let fixture: ComponentFixture<FinanzasSetEstadoMasivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanzasSetEstadoMasivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanzasSetEstadoMasivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
