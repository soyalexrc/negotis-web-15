import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UseriosucursalModalComponent } from './useriosucursal-modal.component';

describe('UseriosucursalModalComponent', () => {
  let component: UseriosucursalModalComponent;
  let fixture: ComponentFixture<UseriosucursalModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UseriosucursalModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UseriosucursalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
