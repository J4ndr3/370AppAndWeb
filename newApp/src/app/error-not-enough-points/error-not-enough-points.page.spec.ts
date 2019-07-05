import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorNotEnoughPointsPage } from './error-not-enough-points.page';

describe('ErrorNotEnoughPointsPage', () => {
  let component: ErrorNotEnoughPointsPage;
  let fixture: ComponentFixture<ErrorNotEnoughPointsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorNotEnoughPointsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorNotEnoughPointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
