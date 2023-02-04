import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaPanelComponent } from './caja-panel.component';

describe('CajaPanelComponent', () => {
  let component: CajaPanelComponent;
  let fixture: ComponentFixture<CajaPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
