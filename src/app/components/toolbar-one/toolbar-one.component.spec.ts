import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarOneComponent } from './toolbar-one.component';

describe('ToolbarOneComponent', () => {
  let component: ToolbarOneComponent;
  let fixture: ComponentFixture<ToolbarOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
