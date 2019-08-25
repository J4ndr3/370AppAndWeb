import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventConfirmPage } from './event-confirm.page';

describe('EventConfirmPage', () => {
  let component: EventConfirmPage;
  let fixture: ComponentFixture<EventConfirmPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventConfirmPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
