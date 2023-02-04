import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListapreciosPanelComponent } from './listaprecios-panel.component';

describe('ListapreciosPanelComponent', () => {
  let component: ListapreciosPanelComponent;
  let fixture: ComponentFixture<ListapreciosPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListapreciosPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListapreciosPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
