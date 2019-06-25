import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftbookingsPage } from './shiftbookings.page';

describe('ShiftbookingsPage', () => {
  let component: ShiftbookingsPage;
  let fixture: ComponentFixture<ShiftbookingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftbookingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftbookingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
