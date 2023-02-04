import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloCantidadModalComponent } from './articulo-cantidad-modal.component';

describe('ArticuloCantidadModalComponent', () => {
  let component: ArticuloCantidadModalComponent;
  let fixture: ComponentFixture<ArticuloCantidadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticuloCantidadModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloCantidadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
