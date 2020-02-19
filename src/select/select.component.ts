import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Inject,
  Input, OnChanges, OnInit,
  Optional,
  Output, QueryList, SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Direction } from '../util/direction';

import { DropdownMenuDirective } from '../dropdown/dropdown-menu.directive';
import { InputBaseComponent } from '../shared/input-base.component';
import { FormFieldComponent } from '../form-field/form-field.component';
import { OptionComponent } from './option.component';

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
export class SelectComponent implements AfterContentInit, InputBaseComponent, ControlValueAccessor {

  private _emptyOverride: boolean;
  _disabled: boolean;

  @Input() autoClose: boolean | 'outside' = true;
  @Input() placeholder: string;
  @Input() tabIndex: number;
  @Input() valueComparer: (valueA: any, valueB: any) => boolean;

  @ViewChild(DropdownMenuDirective) _dropdownMenu: DropdownMenuDirective;
  @ContentChildren(OptionComponent) _options: QueryList<OptionComponent>;

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

    return this.selectedValue === undefined || this.selectedValue === null;
  }

  get disabled(): boolean {
    return this._disabled;
  }
  @Input()
  set disabled(value: boolean) {
    this._disabled = value;
  }

  /**
   * A function to format a given result before display. This function should return a formatted string without any
   * HTML markup
   */
  @Input() selectionFormatter: (value: any) => string;

  @Input() direction: Direction = 'auto';

  selectedOption: OptionComponent;
  selectedValue: any;
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

  private _setSelectComponentInOptions(options: OptionComponent[]) {
    for (const option of options) {
      option._selectComponent = this;
    }
  }

  private _setSelectedOption() {

    if (!this._options) {
      return;
    }

    const option = this._options
      .find(o => {
        if (o.value === this.selectedValue){
          return true;
        }

        return this.valueComparer && this.valueComparer(o.value, this.selectedValue);
      });

    this.selectedOption = option;
  }

  ngAfterContentInit(): void {
    this._setSelectComponentInOptions(this._options.toArray());
    this._options.changes.subscribe(options => this._setSelectComponentInOptions(options));

    this._setSelectedOption();
  }

  _setOption(option: OptionComponent) {
    this.selectedOption = option;
    let defaultPrevented = false;
    this.selectItem.emit({
      item: option.value, preventDefault: () => {
        defaultPrevented = true;
      }
    });

    if (!defaultPrevented) {
      this.writeValue(option.value, false);
      this._onChange(option.value);
    }
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }

  writeValue(value, tryToFindOption: boolean = true) {

    this.selectedValue = value;
    if (!tryToFindOption) {
      return;
    }

    this._setSelectedOption();
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
  }
}
