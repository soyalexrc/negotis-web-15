import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordSuperadminEditarComponent } from './password-superadmin-editar.component';

describe('PasswordSuperadminEditarComponent', () => {
  let component: PasswordSuperadminEditarComponent;
  let fixture: ComponentFixture<PasswordSuperadminEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordSuperadminEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordSuperadminEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
