import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RipplesExampleComponent } from './ripple-example.component';

describe('RippleExampleComponent', () => {
  let component: RipplesExampleComponent;
  let fixture: ComponentFixture<RipplesExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RipplesExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RipplesExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
