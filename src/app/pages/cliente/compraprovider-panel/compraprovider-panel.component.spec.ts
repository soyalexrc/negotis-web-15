import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraproviderPanelComponent } from './compraprovider-panel.component';

describe('CompraproviderPanelComponent', () => {
  let component: CompraproviderPanelComponent;
  let fixture: ComponentFixture<CompraproviderPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompraproviderPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraproviderPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
