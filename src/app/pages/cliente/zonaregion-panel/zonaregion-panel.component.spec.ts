import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaregionPanelComponent } from './zonaregion-panel.component';

describe('ZonaregionPanelComponent', () => {
  let component: ZonaregionPanelComponent;
  let fixture: ComponentFixture<ZonaregionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonaregionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaregionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
