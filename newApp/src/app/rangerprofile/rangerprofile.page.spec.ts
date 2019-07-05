import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangerprofilePage } from './rangerprofile.page';

describe('RangerprofilePage', () => {
  let component: RangerprofilePage;
  let fixture: ComponentFixture<RangerprofilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangerprofilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangerprofilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
