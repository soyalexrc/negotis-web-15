import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionCrearEditarComponent } from './region-crear-editar.component';

describe('RegionCrearEditarComponent', () => {
  let component: RegionCrearEditarComponent;
  let fixture: ComponentFixture<RegionCrearEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionCrearEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionCrearEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
