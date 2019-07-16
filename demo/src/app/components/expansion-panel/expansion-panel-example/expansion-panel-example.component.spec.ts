import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelExampleComponent } from './expansion-panel-example.component';

describe('ExpansionPanelExampleComponent', () => {
  let component: ExpansionPanelExampleComponent;
  let fixture: ComponentFixture<ExpansionPanelExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpansionPanelExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPanelExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
