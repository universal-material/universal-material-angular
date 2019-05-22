import { Component, forwardRef, Inject, Input, OnChanges, Optional, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputBaseComponent } from '../../shared/input-base.component';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { Direction } from '../../util/direction';
import { DropdownMenuDirective } from '../../dropdown/dropdown-menu.directive';

import {
  DATEPICKER_INPUT_DEFAULT_OPTIONS,
  DatepickerInputConfig,
  DefaultDatepickerInputConfig
} from './datepicker-input-config.model';

const DatepickerInputValueAcessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatepickerInputComponent),
  multi: true
};

@Component({
  selector: 'u-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrls: ['./datepicker-input.component.scss'],
  providers: [DatepickerInputValueAcessor]
})
export class DatepickerInputComponent implements InputBaseComponent, ControlValueAccessor, OnChanges {

  @Input() autoClose: boolean | 'outside' = 'outside';
  @Input() placeholder: string;
  @Input() direction: Direction = 'down';
  @Input() tabIndex: number;
  @Input() config: DatepickerInputConfig;

  @ViewChild(DropdownMenuDirective) _dropdownMenu: DropdownMenuDirective;

  date: Date;
  _disabled: boolean;
  _config: DatepickerInputConfig;

  get focused(): boolean {
    return this._dropdownMenu && this._dropdownMenu.show;
  }

  get empty(): boolean {
    return !this.date;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  constructor(@Optional() @Inject(forwardRef(() => FormFieldComponent)) formField: FormFieldComponent,
              @Optional() @Inject(DATEPICKER_INPUT_DEFAULT_OPTIONS) private readonly _userDefaultConfig: DatepickerInputConfig) {
    if (formField) {
      formField._input = this;
    }

    this._config = {...DefaultDatepickerInputConfig, ..._userDefaultConfig};
  }

  private _onTouched = () => {};
  private _onChange = (_: any) => {};


  _setDate(date: Date) {
    this.writeValue(date);
    this._onChange(date);

    if (this.autoClose) {
      this._dropdownMenu.show = false;
    }
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }

  writeValue(value) {
    this.date = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.config) {
      this._config = {...DefaultDatepickerInputConfig, ...this._userDefaultConfig, ...this.config};
    }
  }
}
