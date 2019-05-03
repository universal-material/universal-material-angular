import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBarDirective } from './tab-bar.directive';

describe('TabBarDirective', () => {
  let component: TabBarDirective;
  let fixture: ComponentFixture<TabBarDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabBarDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabBarDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
