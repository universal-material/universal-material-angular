import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipInputExampleComponent } from './chip-input-example.component';

describe('ChipInputExampleComponent', () => {
  let component: ChipInputExampleComponent;
  let fixture: ComponentFixture<ChipInputExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipInputExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipInputExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
