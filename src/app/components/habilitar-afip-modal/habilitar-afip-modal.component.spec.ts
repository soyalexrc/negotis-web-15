import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitarAfipModalComponent } from './habilitar-afip-modal.component';

describe('HabilitarAfipModalComponent', () => {
  let component: HabilitarAfipModalComponent;
  let fixture: ComponentFixture<HabilitarAfipModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabilitarAfipModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitarAfipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
