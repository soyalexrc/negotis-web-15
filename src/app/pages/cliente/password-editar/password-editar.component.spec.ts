import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordEditarComponent } from './password-editar.component';

describe('PasswordEditarComponent', () => {
  let component: PasswordEditarComponent;
  let fixture: ComponentFixture<PasswordEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
