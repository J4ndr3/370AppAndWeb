import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTestPage } from './map-test.page';

describe('MapTestPage', () => {
  let component: MapTestPage;
  let fixture: ComponentFixture<MapTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapTestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
