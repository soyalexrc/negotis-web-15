import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimirEgresoModal } from './imprimir-egreso-modal.component';

describe('ImprimirEgresoModal', () => {
  let component: ImprimirEgresoModal;
  let fixture: ComponentFixture<ImprimirEgresoModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprimirEgresoModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirEgresoModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
