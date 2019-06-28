import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressSpinnerExampleComponent } from './progress-spinner-example.component';

describe('ProgressSpinnerExampleComponent', () => {
  let component: ProgressSpinnerExampleComponent;
  let fixture: ComponentFixture<ProgressSpinnerExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressSpinnerExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressSpinnerExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
