import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolPanelComponent } from './rol-panel.component';

describe('RolPanelComponent', () => {
  let component: RolPanelComponent;
  let fixture: ComponentFixture<RolPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
