import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPagerSlideComponent } from './view-pager-slide.component';

describe('ViewPagerSlideComponent', () => {
  let component: ViewPagerSlideComponent;
  let fixture: ComponentFixture<ViewPagerSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPagerSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPagerSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
