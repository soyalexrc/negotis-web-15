import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionPanelComponent } from './region-panel.component';

describe('RegionPanelComponent', () => {
  let component: RegionPanelComponent;
  let fixture: ComponentFixture<RegionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
