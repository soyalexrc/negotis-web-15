import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoPanelComponent } from './empleado-panel.component';

describe('EmpleadoPanelComponent', () => {
  let component: EmpleadoPanelComponent;
  let fixture: ComponentFixture<EmpleadoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
