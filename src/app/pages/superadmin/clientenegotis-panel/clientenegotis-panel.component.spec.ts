import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientenegotisPanelComponent } from './clientenegotis-panel.component';

describe('ClientenegotisPanelComponent', () => {
  let component: ClientenegotisPanelComponent;
  let fixture: ComponentFixture<ClientenegotisPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientenegotisPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientenegotisPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
