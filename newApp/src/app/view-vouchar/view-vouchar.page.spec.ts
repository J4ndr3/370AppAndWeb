import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVoucharPage } from './view-vouchar.page';

describe('ViewVoucharPage', () => {
  let component: ViewVoucharPage;
  let fixture: ComponentFixture<ViewVoucharPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVoucharPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVoucharPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
