import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonaPanelComponent } from './zona-panel.component';

describe('ZonaPanelComponent', () => {
  let component: ZonaPanelComponent;
  let fixture: ComponentFixture<ZonaPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZonaPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZonaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
