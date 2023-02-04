import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecificacionModalComponent } from './especificacion-modal.component';

describe('EspecificacionModalComponent', () => {
  let component: EspecificacionModalComponent;
  let fixture: ComponentFixture<EspecificacionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EspecificacionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspecificacionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
