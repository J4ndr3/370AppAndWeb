import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsPage } from './incidents.page';

describe('IncidentsPage', () => {
  let component: IncidentsPage;
  let fixture: ComponentFixture<IncidentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
