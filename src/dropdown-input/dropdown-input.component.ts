import { Component, EventEmitter, forwardRef, Inject, Input, Optional, Output } from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {Direction} from '../util/direction';
import { TEXT_FIELD_DEFAULT_APPEARANCE, TextFieldAppearance, TextFieldBaseComponent } from '../shared/text-field-base.component';

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
  styleUrls: [ './dropdown-input.component.scss' ],
  providers: [DropdownInputValueAcessor]
})
export class DropdownInputComponent extends TextFieldBaseComponent implements ControlValueAccessor {

  _disabled: boolean;

  @Input() appearance: TextFieldAppearance;
  @Input() invalid: string;
  @Input() placeholder: string;
  @Input() label: string;
  @Input() nullSelectionLabel: string;

  /**
   * A function to format a given result before display. This function should return a formatted string without any
   * HTML markup
   */
  @Input() itemFormatter: (value: any) => string;

  @Input() direction: Direction = 'down';
  @Input() items: any[];
  selectedItem: any;
  @Output() selectItem = new EventEmitter<DropdownInputSelectItemEvent>();

  constructor(@Optional() @Inject(TEXT_FIELD_DEFAULT_APPEARANCE) defaultAppearance: TextFieldAppearance) {
    super(defaultAppearance);
  }

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
