import { Component, ElementRef, HostBinding, Input } from '@angular/core';

import { Subject } from 'rxjs';

@Component({
  selector: 'u-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss']
})
export class ExpansionPanelComponent {

  private _open: boolean;

  @Input() hideToggle = false;

  @HostBinding('class.open')
  get open(): boolean {
    return this._open;
  }
  set open(value: boolean) {
    this._open = value;
    this._toggleChange.next(this);
  }

  _toggleChange = new Subject<ExpansionPanelComponent>();

  constructor(elementRef: ElementRef) {
    elementRef.nativeElement.classList.add('u-expansion-panel');
  }

  toggle() {
    this.open = !this.open;
  }
}
