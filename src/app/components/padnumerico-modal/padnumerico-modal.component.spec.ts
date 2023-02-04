import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadnumericoModalComponent } from './padnumerico-modal.component';

describe('PadnumericoModalComponent', () => {
  let component: PadnumericoModalComponent;
  let fixture: ComponentFixture<PadnumericoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadnumericoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadnumericoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
