import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddvehiclePage } from './addvehicle.page';

describe('AddvehiclePage', () => {
  let component: AddvehiclePage;
  let fixture: ComponentFixture<AddvehiclePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddvehiclePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddvehiclePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
