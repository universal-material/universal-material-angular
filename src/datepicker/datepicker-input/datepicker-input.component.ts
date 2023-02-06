import { Component, ElementRef, forwardRef, Inject, Input, LOCALE_ID, Optional, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { InputBaseComponent } from '../../shared/input-base.component';
import { FormFieldComponent } from '../../form-field/form-field.component';
import { Direction } from '../../util/direction';
import { DropdownMenuDirective } from '../../dropdown/dropdown-menu.directive';

import { DatepickerBaseComponent } from '../datepicker-base.component';
import { DATEPICKER_DEFAULT_OPTIONS, DatepickerConfig } from '../datepicker-config.model';
import { DatepickerAdapter } from '../datepicker-adapter';
import { DefaultDatepickerAdapter } from '../default-datepicker-adapter';
import { DropdownDirective } from '../../dropdown/dropdown.directive';

const DatepickerInputValueAcessor = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DatepickerInputComponent),
  multi: true
};

@Component({
  selector: 'u-datepicker-input',
  templateUrl: './datepicker-input.component.html',
  styleUrls: ['./datepicker-input.component.scss'],
  providers: [
    DatepickerInputValueAcessor,
    {provide: DatepickerBaseComponent, useExisting: DatepickerInputComponent}
  ],
  encapsulation: ViewEncapsulation.None
})
export class DatepickerInputComponent extends DatepickerBaseComponent implements InputBaseComponent, ControlValueAccessor {

  @Input() autoClose: boolean | 'outside' = 'outside';
  @Input() placeholder: string | null = null;
  @Input() direction: Direction = 'auto';
  @Input() tabIndex: number | null = null;
  @Input() inputFormatter: ((value: Date) => string | null) | null = null;
  // @Input() config: DatepickerInputConfig;

  @ViewChild('toggle') toggle!: ElementRef<HTMLButtonElement>;

  @ViewChild(DropdownDirective) _dropdown!: DropdownDirective;
  @ViewChild(DropdownMenuDirective) _dropdownMenu!: DropdownMenuDirective;

  override date: Date | null = null;
  _disabled = false;

  focused = false;
  // get focused(): boolean {
  //   return this._dropdownMenu && this._dropdownMenu.show;
  // }

  get empty(): boolean {
    return !this.date;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  constructor(elementRef: ElementRef<HTMLElement>,
              @Inject(LOCALE_ID) _locale: string,
              @Optional() @Inject(DatepickerAdapter) datepickerAdapter: DatepickerAdapter,
              @Optional() @Inject(DATEPICKER_DEFAULT_OPTIONS) _defaultConfig: DatepickerConfig,
              defaultDatepickerAdapter: DefaultDatepickerAdapter,
              @Optional() @Inject(forwardRef(() => FormFieldComponent)) formField: FormFieldComponent) {
    super(_locale, _defaultConfig, datepickerAdapter, defaultDatepickerAdapter);

    elementRef.nativeElement.classList.add('u-text-input');
    formField.selectionField = true;

    if (formField) {
      formField._input = this;
    }
  }

  private _onTouched = () => {};
  private _onChange = (_: any) => {};

  override _setDate(date: Date): void {
    super._setDate(date);

    if (!this._onChange) {
      return;
    }

    this._onChange(date);

    if (this.autoClose && this._dropdownMenu) {
      this._dropdownMenu.show = false;
    }
  }

  focus(): void {
    this._dropdown.toggle();
    this.toggle.nativeElement.focus();
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }

  writeValue(value: Date) {
    this._setDate(value);
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }

  _focusChanged(focused: boolean) {
    if (focused === this.focused) {
      return;
    }

    this.focused = focused;

    if (!focused) {
      this._dropdown.close();
    }
  }
}
