import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoPanelComponent } from './producto-panel.component';

describe('ProductoPanelComponent', () => {
  let component: ProductoPanelComponent;
  let fixture: ComponentFixture<ProductoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
