import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregararticuloModalComponent } from './agregararticulo-modal.component';

describe('AgregararticuloModalComponent', () => {
  let component: AgregararticuloModalComponent;
  let fixture: ComponentFixture<AgregararticuloModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregararticuloModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregararticuloModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
