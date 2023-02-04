import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPanelComponent } from './usuario-panel.component';

describe('UsuarioPanelComponent', () => {
  let component: UsuarioPanelComponent;
  let fixture: ComponentFixture<UsuarioPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
