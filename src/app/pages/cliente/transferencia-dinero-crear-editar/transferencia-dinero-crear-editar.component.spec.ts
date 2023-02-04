import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaDineroCrearEditarComponent } from './transferencia-dinero-crear-editar.component';

describe('TransferenciaDineroCrearEditarComponent', () => {
  let component: TransferenciaDineroCrearEditarComponent;
  let fixture: ComponentFixture<TransferenciaDineroCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferenciaDineroCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciaDineroCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
