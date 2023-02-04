import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosincantidadModalComponent } from './articulosincantidad-modal.component';

describe('ArticulosincantidadModalComponent', () => {
  let component: ArticulosincantidadModalComponent;
  let fixture: ComponentFixture<ArticulosincantidadModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticulosincantidadModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosincantidadModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
