import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleSnackbarExampleComponent } from './simple-snackbar-example.component';

describe('SimpleSnackbarExampleComponent', () => {
  let component: SimpleSnackbarExampleComponent;
  let fixture: ComponentFixture<SimpleSnackbarExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleSnackbarExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleSnackbarExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
