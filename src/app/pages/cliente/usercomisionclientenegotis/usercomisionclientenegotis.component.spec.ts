import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercomisionclientenegotisComponent } from './usercomisionclientenegotis.component';

describe('UsercomisionclientenegotisComponent', () => {
  let component: UsercomisionclientenegotisComponent;
  let fixture: ComponentFixture<UsercomisionclientenegotisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsercomisionclientenegotisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercomisionclientenegotisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
