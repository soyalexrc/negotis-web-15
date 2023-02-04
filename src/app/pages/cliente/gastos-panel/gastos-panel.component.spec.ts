import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosPanelComponent } from './gastos-panel.component';

describe('GastosPanelComponent', () => {
  let component: GastosPanelComponent;
  let fixture: ComponentFixture<GastosPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
