import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaPanelComponent } from './tarjeta-panel.component';

describe('TarjetaPanelComponent', () => {
  let component: TarjetaPanelComponent;
  let fixture: ComponentFixture<TarjetaPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarjetaPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
