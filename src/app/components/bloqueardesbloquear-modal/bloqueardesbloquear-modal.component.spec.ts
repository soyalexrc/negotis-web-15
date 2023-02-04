import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueardesbloquearModalComponent } from './bloqueardesbloquear-modal.component';

describe('BloqueardesbloquearModalComponent', () => {
  let component: BloqueardesbloquearModalComponent;
  let fixture: ComponentFixture<BloqueardesbloquearModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloqueardesbloquearModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloqueardesbloquearModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
