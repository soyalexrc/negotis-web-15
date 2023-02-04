import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemNoEncontradoComponent } from './item-no-encontrado.component';

describe('ItemNoEncontradoComponent', () => {
  let component: ItemNoEncontradoComponent;
  let fixture: ComponentFixture<ItemNoEncontradoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemNoEncontradoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemNoEncontradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
