import { Component, forwardRef, HostListener, Inject, Input } from '@angular/core';

import { SelectComponent } from './select.component';

@Component({
  selector: 'u-option',
  template: `
    <div uRipple class="u-dropdown-item">
      <ng-content></ng-content>
    </div>`
})
export class OptionComponent {
  @Input() value: any;
  @Input() displayValue: string | null = null;
  _selectComponent!: SelectComponent;

  @HostListener('click') _click = () => {
    this._selectComponent._setOption(this);
  }
}
