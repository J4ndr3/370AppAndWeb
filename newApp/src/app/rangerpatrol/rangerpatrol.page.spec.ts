import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangerpatrolPage } from './rangerpatrol.page';

describe('RangerpatrolPage', () => {
  let component: RangerpatrolPage;
  let fixture: ComponentFixture<RangerpatrolPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangerpatrolPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangerpatrolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
