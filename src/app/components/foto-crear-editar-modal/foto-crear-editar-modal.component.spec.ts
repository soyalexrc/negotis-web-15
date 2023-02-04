import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotoCrearEditarModalComponent } from './foto-crear-editar-modal.component';

describe('FotoCrearEditarModalComponent', () => {
  let component: FotoCrearEditarModalComponent;
  let fixture: ComponentFixture<FotoCrearEditarModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotoCrearEditarModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoCrearEditarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
