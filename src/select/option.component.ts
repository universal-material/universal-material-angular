import { Component, forwardRef, HostListener, Inject, Input } from '@angular/core';

import { SelectComponent } from './select.component';

@Component({
  selector: 'u-option',
  template: `
    <div class="u-dropdown-item">
      <ng-content></ng-content>
    </div>`
})
export class OptionComponent {
  @Input() value: any;

  @HostListener('click') _click = () => {
    this._selectComponent._setItem(this.value);
  }

  constructor(@Inject(forwardRef(() => SelectComponent)) private readonly _selectComponent: SelectComponent) {

  }
}
