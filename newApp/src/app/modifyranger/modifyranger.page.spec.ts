import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyrangerPage } from './modifyranger.page';

describe('ModifyrangerPage', () => {
  let component: ModifyrangerPage;
  let fixture: ComponentFixture<ModifyrangerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyrangerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyrangerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
