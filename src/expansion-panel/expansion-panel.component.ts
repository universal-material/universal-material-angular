import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostBinding, Input } from '@angular/core';

import { Subject } from 'rxjs';
import { CollapseComponent } from '../collapse/collapse.component';

@Component({
  selector: 'u-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  imports: [CollapseComponent],
})
export class ExpansionPanelComponent {

  private _expanded = false;

  @HostBinding('class.disabled') @Input() disabled = false;
  @Input() hideToggle = false;

  @HostBinding('class.expanded')
  get expanded(): boolean {
    return this._expanded;
  }

  set expanded(value: boolean) {
    this._expanded = value;
    this._toggleChange.next(this);
  }

  _toggleChange = new Subject<ExpansionPanelComponent>();

  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.classList.add('u-expansion-panel');
  }

  toggle() {
    if (this.disabled) {
      return;
    }

    this.expanded = !this.expanded;
  }
}
