import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentadetallePanelComponent } from './cuentadetalle-panel.component';

describe('CuentadetallePanelComponent', () => {
  let component: CuentadetallePanelComponent;
  let fixture: ComponentFixture<CuentadetallePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentadetallePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentadetallePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
