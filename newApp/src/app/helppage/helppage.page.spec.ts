import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelppagePage } from './helppage.page';

describe('HelppagePage', () => {
  let component: HelppagePage;
  let fixture: ComponentFixture<HelppagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelppagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelppagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
