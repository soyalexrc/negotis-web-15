import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferenciaDineroPanelComponent } from './transferencia-dinero-panel.component';

describe('TransferenciaDineroPanelComponent', () => {
  let component: TransferenciaDineroPanelComponent;
  let fixture: ComponentFixture<TransferenciaDineroPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferenciaDineroPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferenciaDineroPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
