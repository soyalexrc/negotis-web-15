import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorforaneaModalComponent } from './errorforanea-modal.component';

describe('ErrorforaneaModalComponent', () => {
  let component: ErrorforaneaModalComponent;
  let fixture: ComponentFixture<ErrorforaneaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorforaneaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorforaneaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
