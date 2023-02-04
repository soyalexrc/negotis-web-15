import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriarubroPanelComponent } from './categoriarubro-panel.component';

describe('CategoriarubroPanelComponent', () => {
  let component: CategoriarubroPanelComponent;
  let fixture: ComponentFixture<CategoriarubroPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriarubroPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriarubroPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
