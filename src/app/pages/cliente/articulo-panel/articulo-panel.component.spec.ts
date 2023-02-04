import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloPanelComponent } from './articulo-panel.component';

describe('ArticuloPanelComponent', () => {
  let component: ArticuloPanelComponent;
  let fixture: ComponentFixture<ArticuloPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
