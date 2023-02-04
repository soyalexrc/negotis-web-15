import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcaPanelComponent } from './marca-panel.component';

describe('MarcaPanelComponent', () => {
  let component: MarcaPanelComponent;
  let fixture: ComponentFixture<MarcaPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarcaPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
