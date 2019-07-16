import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpansionPanelContainerComponent } from './expansion-panel-container.component';

describe('ExpansionPanelContainerComponent', () => {
  let component: ExpansionPanelContainerComponent;
  let fixture: ComponentFixture<ExpansionPanelContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpansionPanelContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpansionPanelContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
