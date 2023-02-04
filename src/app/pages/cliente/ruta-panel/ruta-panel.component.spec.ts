import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RutaPanelComponent } from './ruta-panel.component';

describe('RutaPanelComponent', () => {
  let component: RutaPanelComponent;
  let fixture: ComponentFixture<RutaPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RutaPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RutaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
