import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPagerComponent } from './view-pager.component';

describe('ViewPagerComponent', () => {
  let component: ViewPagerComponent;
  let fixture: ComponentFixture<ViewPagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
