import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterformPage } from './registerform.page';

describe('RegisterformPage', () => {
  let component: RegisterformPage;
  let fixture: ComponentFixture<RegisterformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterformPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
