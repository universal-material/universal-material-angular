import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyButtonComponent } from './legacy-button.component';

describe('LegacyButtonComponent', () => {
  let component: LegacyButtonComponent;
  let fixture: ComponentFixture<LegacyButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegacyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegacyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
