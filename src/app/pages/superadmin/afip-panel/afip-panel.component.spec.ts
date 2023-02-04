import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfipPanelComponent } from './afip-panel.component';

describe('AfipPanelComponent', () => {
  let component: AfipPanelComponent;
  let fixture: ComponentFixture<AfipPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfipPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfipPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
