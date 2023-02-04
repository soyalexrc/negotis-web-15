import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriagastoPanelComponent } from './categoriagasto-panel.component';

describe('CategoriagastoPanelComponent', () => {
  let component: CategoriagastoPanelComponent;
  let fixture: ComponentFixture<CategoriagastoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriagastoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriagastoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
