import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanzasConfiguracionPanelComponent } from './finanzas-configuracion-panel.component';

describe('FinanzasConfiguracionPanelComponent', () => {
  let component: FinanzasConfiguracionPanelComponent;
  let fixture: ComponentFixture<FinanzasConfiguracionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanzasConfiguracionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanzasConfiguracionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
