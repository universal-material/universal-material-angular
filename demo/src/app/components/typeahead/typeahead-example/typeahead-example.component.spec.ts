import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeaheadExampleComponent } from './typeahead-example.component';

describe('TypeaheadExampleComponent', () => {
  let component: TypeaheadExampleComponent;
  let fixture: ComponentFixture<TypeaheadExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeaheadExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeaheadExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
