import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionPanelComponent } from './comision-panel.component';

describe('ComisionPanelComponent', () => {
  let component: ComisionPanelComponent;
  let fixture: ComponentFixture<ComisionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComisionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
