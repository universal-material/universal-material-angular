import {
  AfterContentInit,
  Component,
  ContentChild,
  DoCheck, ElementRef,
  EventEmitter,
  forwardRef, HostBinding,
  Inject,
  Input, IterableDiffer,
  IterableDiffers, OnInit,
  Optional,
  Output
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBaseComponent } from '../shared/input-base.component';
import { FormFieldComponent } from '../form-field/form-field.component';
import { ChipInputDirective } from '../chip-field/chip-input.directive';

const CHIP_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ChipFieldComponent),
  multi: true
};

@Component({
  selector: 'u-chip-field',
  templateUrl: './chip-field.component.html',
  styleUrls: ['./chip-field.component.scss'],
  providers: [CHIP_INPUT_VALUE_ACCESSOR]
})
export class ChipFieldComponent implements InputBaseComponent, ControlValueAccessor, AfterContentInit, DoCheck {

  @Input() itemFormatter: (item: any) => string;
  @Input() items: any[];
  @Output() itemsChange = new EventEmitter();
  @Output() afterRemove = new EventEmitter();

  @Input() addOnEnter = true;
  @Input() removeOnBackspace = true;

  @ContentChild(ChipInputDirective) chipInput: ChipInputDirective;

  @HostBinding('attr.disabled')
  get disabled(): boolean {
    return this.chipInput.disabled;
  }

  get focused(): boolean {
    return this.chipInput.focused;
  }

  get empty(): boolean {
    return this.chipInput.empty && (!this.items || !this.items.length);
  }

  differ: IterableDiffer<any>;

  constructor(elementRef: ElementRef,
              private readonly differs: IterableDiffers,
              @Optional() @Inject(forwardRef(() => FormFieldComponent)) formField: FormFieldComponent) {
    this.differ = differs.find([]).create(null);

    elementRef.nativeElement.classList.add('u-text-input');
    if (formField) {
      formField._input = this;
      formField._elementRef.nativeElement.classList.add('u-chip-field');
    }
  }

  ngAfterContentInit(): void {
    this.chipInput.enterKeyDown.subscribe(() => {
      if (!this.addOnEnter || !this.chipInput.value) {
        return;
      }

      this.items = this.items || [];

      this.items.push(this.chipInput.value);
      this.chipInput.value = '';
    });

    this.chipInput.backspaceKeyDown.subscribe(() => {
      if (!this.removeOnBackspace || this.chipInput.value || !this.items || !this.items.length) {
        return;
      }

      const item = this.items[this.items.length - 1];
      this.items.splice(this.items.length - 1, 1);
      this.afterRemove.emit(item);
    });
  }

  private _onTouched = () => {};
  private _onChange = (_: any) => {};

  removeItem(item: {}) {

    if (this.disabled) {
      return;
    }

    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.afterRemove.emit(item);
    this.itemsChange.emit(this.items);
    this._onChange(this.items);
  }

  ngDoCheck() {
    const changes = this.differ.diff(this.items);
    if (changes) {
      this._onChange(this.items);
    }
  }

  writeValue(value: any): void {
    this.items = value;
  }

  registerOnChange(fn: (value: any) => any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this._onTouched = fn;
  }
}
