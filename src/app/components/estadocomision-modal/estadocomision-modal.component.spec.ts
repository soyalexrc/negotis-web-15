import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadocomisionModalComponent } from './estadocomision-modal.component';

describe('EstadocomisionModalComponent', () => {
  let component: EstadocomisionModalComponent;
  let fixture: ComponentFixture<EstadocomisionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadocomisionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadocomisionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
