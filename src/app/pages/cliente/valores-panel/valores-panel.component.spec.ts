import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresPanelComponent } from './valores-panel.component';

describe('ValoresPanelComponent', () => {
  let component: ValoresPanelComponent;
  let fixture: ComponentFixture<ValoresPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValoresPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValoresPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
