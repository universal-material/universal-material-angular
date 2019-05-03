import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabIndicatorDirective } from './tab-indicator.directive';

describe('TabIndicatorDirective', () => {
  let component: TabIndicatorDirective;
  let fixture: ComponentFixture<TabIndicatorDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabIndicatorDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabIndicatorDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
