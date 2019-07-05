import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifybookingPage } from './modifybooking.page';

describe('ModifybookingPage', () => {
  let component: ModifybookingPage;
  let fixture: ComponentFixture<ModifybookingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifybookingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifybookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
