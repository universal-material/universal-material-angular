import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsibleToolbarComponent } from './collapsible-toolbar.component';

describe('CollapsibleToolbarComponent', () => {
  let component: CollapsibleToolbarComponent;
  let fixture: ComponentFixture<CollapsibleToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollapsibleToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsibleToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
