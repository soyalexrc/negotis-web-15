import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadochequePanelComponent } from './estadocheque-panel.component';

describe('EstadochequePanelComponent', () => {
  let component: EstadochequePanelComponent;
  let fixture: ComponentFixture<EstadochequePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadochequePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadochequePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
