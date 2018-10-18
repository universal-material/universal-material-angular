import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {Direction} from '../util/direction';

const DropdownInputValueAcessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownInputComponent),
  multi: true
};

export interface DropdownInputSelectItemEvent {
  /**
   * An item about to be selected
   */
  item: any;

  /**
   * Function that will prevent item selection if called
   */
  preventDefault: () => void;
}

@Component({
  selector: 'u-dropdown-input',
  templateUrl: './dropdown-input.component.html',
  styles: [
    '.dropdown-menu { max-height: 300px;  overflow-y: auto; }'
  ],
  providers: [DropdownInputValueAcessor]
})
export class DropdownInputComponent implements ControlValueAccessor {

  _disabled: boolean;

  @Input() placeholder: string;
  @Input() label: string;
  @Input() nullSelectionLabel: string;

  /**
   * A function to convert a given value into string to display in the input field
   */
  @Input() inputFormatter: (value: any) => string;

  /**
   * A function to format a given result before display. This function should return a formatted string without any
   * HTML markup
   */
  @Input() itemFormatter: (value: any) => string;

  @Input() direction: Direction = 'down';
  @Input() items: any[];
  selectedItem: any;
  @Output() selectItem = new EventEmitter<DropdownInputSelectItemEvent>();

  nothingSelected() {
    return this.selectedItem === null || this.selectedItem === undefined;
  }

  private _onTouched = () => {};
  private _onChange = (_: any) => {};

  _selectItem(item: any) {
    let defaultPrevented = false;
    this.selectItem.emit({item: item, preventDefault: () => { defaultPrevented = true; }});

    if (!defaultPrevented) {
      this.writeValue(item);
      this._onChange(item);
    }
  }

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }

  registerOnTouched(fn: () => any): void { this._onTouched = fn; }

  writeValue(value) { this.selectedItem = value; }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
