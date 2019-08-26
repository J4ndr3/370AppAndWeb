import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyvehiclePage } from './modifyvehicle.page';

describe('ModifyvehiclePage', () => {
  let component: ModifyvehiclePage;
  let fixture: ComponentFixture<ModifyvehiclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyvehiclePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyvehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
