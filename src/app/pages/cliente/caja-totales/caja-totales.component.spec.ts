import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaTotalesComponent } from './caja-totales.component';

describe('CajaTotalesComponent', () => {
  let component: CajaTotalesComponent;
  let fixture: ComponentFixture<CajaTotalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CajaTotalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaTotalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
