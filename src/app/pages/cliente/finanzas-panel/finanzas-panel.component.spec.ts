import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanzasPanelComponent } from './finanzas-panel.component';

describe('FinanzasPanelComponent', () => {
  let component: FinanzasPanelComponent;
  let fixture: ComponentFixture<FinanzasPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanzasPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanzasPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
