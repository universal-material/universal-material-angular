import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressDialogExampleComponent } from './progress-dialog-example.component';

describe('ProgressDialogExampleComponent', () => {
  let component: ProgressDialogExampleComponent;
  let fixture: ComponentFixture<ProgressDialogExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressDialogExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressDialogExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
