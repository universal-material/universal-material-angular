import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerExampleComponent } from './datepicker-example.component';

describe('DatepickerExampleComponent', () => {
  let component: DatepickerExampleComponent;
  let fixture: ComponentFixture<DatepickerExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
