import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerFacturaModalComponent } from './ver-factura-modal.component';

describe('VerFacturaModalComponent', () => {
  let component: VerFacturaModalComponent;
  let fixture: ComponentFixture<VerFacturaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerFacturaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerFacturaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
