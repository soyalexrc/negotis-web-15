import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarOperacionExitosaComponent } from './snack-bar-operacion-exitosa.component';

describe('SnackBarOperacionExitosaComponent', () => {
  let component: SnackBarOperacionExitosaComponent;
  let fixture: ComponentFixture<SnackBarOperacionExitosaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackBarOperacionExitosaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarOperacionExitosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
