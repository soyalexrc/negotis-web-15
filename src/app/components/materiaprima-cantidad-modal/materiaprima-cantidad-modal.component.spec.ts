import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaPrimaCantidadModalComponent } from './materiaprima-cantidad-modal.component';

describe('MateriaPrimaCantidadModalComponent', () => {
  let component: MateriaPrimaCantidadModalComponent;
  let fixture: ComponentFixture<MateriaPrimaCantidadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MateriaPrimaCantidadModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaPrimaCantidadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
