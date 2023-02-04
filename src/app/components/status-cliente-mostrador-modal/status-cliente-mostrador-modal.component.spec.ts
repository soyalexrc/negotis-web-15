import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusClienteMostradorModalComponent } from './status-cliente-mostrador-modal.component';

describe('StatusClienteMostradorModalComponent', () => {
  let component: StatusClienteMostradorModalComponent;
  let fixture: ComponentFixture<StatusClienteMostradorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusClienteMostradorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusClienteMostradorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
