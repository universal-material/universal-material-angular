import {
  Component,
  ContentChild,
  DoCheck,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
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
export class ChipFieldComponent implements InputBaseComponent, ControlValueAccessor, OnInit, DoCheck {

  @Input() showIcon: boolean;
  @Input() showRemove: boolean;
  @Input() itemFormatter: (item: any) => string;
  @Input() items: any[];
  @Output() itemsChange = new EventEmitter();
  @Output() itemRemoved = new EventEmitter();

  @Input() addOnEnter = true;
  @Input() removeOnBackspace = true;

  @ContentChild(ChipInputDirective) chipInput: ChipInputDirective;

  get disabled(): boolean {
    return this.chipInput.disabled;
  }

  get focused(): boolean {
    return this.chipInput.focused;
  }

  get empty(): boolean {
    return this.chipInput.empty && (!this.items || !this.items.length);
  }

  differ;

  constructor(private readonly differs: IterableDiffers,
              @Optional() @Inject(forwardRef(() => FormFieldComponent)) formField: FormFieldComponent) {
    this.differ = differs.find([]).create(null);

    if (formField) {
      formField._input = this;
    }
  }

  ngOnInit(): void {
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

      this.items.splice(this.items.length - 1, 1);
    });
  }

  private _onTouched = () => {}
  private _onChange = (_: any) => {}

  removeItem(item: {}) {

    if (this.disabled) {
      return;
    }

    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.itemRemoved.emit(item);
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
