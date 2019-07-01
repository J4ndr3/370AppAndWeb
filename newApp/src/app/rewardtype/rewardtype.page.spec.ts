import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardtypePage } from './rewardtype.page';

describe('RewardtypePage', () => {
  let component: RewardtypePage;
  let fixture: ComponentFixture<RewardtypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardtypePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardtypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
