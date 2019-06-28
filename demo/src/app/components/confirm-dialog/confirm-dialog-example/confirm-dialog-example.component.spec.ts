import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogExampleComponent } from './confirm-dialog-example.component';

describe('ConfirmDialogExampleComponent', () => {
  let component: ConfirmDialogExampleComponent;
  let fixture: ComponentFixture<ConfirmDialogExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
