import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubroPanelComponent } from './rubro-panel.component';

describe('RubroPanelComponent', () => {
  let component: RubroPanelComponent;
  let fixture: ComponentFixture<RubroPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubroPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubroPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
