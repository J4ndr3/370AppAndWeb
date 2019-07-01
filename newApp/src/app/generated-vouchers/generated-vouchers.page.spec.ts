import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratedVouchersPage } from './generated-vouchers.page';

describe('GeneratedVouchersPage', () => {
  let component: GeneratedVouchersPage;
  let fixture: ComponentFixture<GeneratedVouchersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratedVouchersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratedVouchersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
