import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionControlsExampleComponent } from './selection-controls-example.component';

describe('SelectionControlsExampleComponent', () => {
  let component: SelectionControlsExampleComponent;
  let fixture: ComponentFixture<SelectionControlsExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectionControlsExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionControlsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
