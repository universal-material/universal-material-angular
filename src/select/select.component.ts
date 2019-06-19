import { Component, EventEmitter, forwardRef, Inject, Input, Optional, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Direction } from '../util/direction';

import { DropdownMenuDirective } from '../dropdown/dropdown-menu.directive';
import { InputBaseComponent } from '../shared/input-base.component';
import { FormFieldComponent } from '../form-field/form-field.component';

const SelectValueAcessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectComponent),
  multi: true
};

export interface SelectItemEvent {
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
  selector: 'u-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [SelectValueAcessor]
})
export class SelectComponent implements InputBaseComponent, ControlValueAccessor {

  private _emptyOverride: boolean;
  _disabled: boolean;

  @Input() autoClose = true;
  @Input() appearance: any;
  @Input() placeholder: string;
  @Input() nullSelectionLabel: string;
  @Input() tabIndex: number;

  @ViewChild(DropdownMenuDirective) _dropdownMenu: DropdownMenuDirective;

  get focused(): boolean {
    return this._dropdownMenu && this._dropdownMenu.show;
  }

  @Input()
  set empty(value: boolean) {
    this._emptyOverride = value;
  }

  get empty(): boolean {

    if (this._emptyOverride !== undefined) {
      return this._emptyOverride;
    }

    return this.selectedItem === undefined || this.selectedItem === null;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  /**
   * A function to format a given result before display. This function should return a formatted string without any
   * HTML markup
   */
  @Input() selectionFormatter: (value: any) => string;

  @Input() direction: Direction = 'down';

  selectedItem: any;
  @Output() selectItem = new EventEmitter<SelectItemEvent>();

  constructor(@Optional() @Inject(forwardRef(() => FormFieldComponent)) formField: FormFieldComponent) {
    if (formField) {
      formField._input = this;
    }
  }

  private _onTouched = () => {
  }
  private _onChange = (_: any) => {
  }

  _setItem(item: any) {
    let defaultPrevented = false;
    this.selectItem.emit({
      item: item, preventDefault: () => {
        defaultPrevented = true;
      }
    });

    if (!defaultPrevented) {
      this.writeValue(item);
      this._onChange(item);
    }
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }

  writeValue(value) {
    this.selectedItem = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
