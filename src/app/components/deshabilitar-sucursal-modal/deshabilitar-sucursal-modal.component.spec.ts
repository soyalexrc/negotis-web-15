import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeshabilitarSucursalModalComponent } from './deshabilitar-sucursal-modal.component';

describe('DeshabilitarSucursalModalComponent', () => {
  let component: DeshabilitarSucursalModalComponent;
  let fixture: ComponentFixture<DeshabilitarSucursalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeshabilitarSucursalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeshabilitarSucursalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
