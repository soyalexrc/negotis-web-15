import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarTwoComponent } from './toolbar-two.component';

describe('ToolbarTwoComponent', () => {
  let component: ToolbarTwoComponent;
  let fixture: ComponentFixture<ToolbarTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
