import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { List3Component } from './list3.component';

describe('List3Component', () => {
  let component: List3Component;
  let fixture: ComponentFixture<List3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ List3Component ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(List3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
