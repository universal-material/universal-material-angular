import { ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, ElementRef, forwardRef, Provider, Renderer2 } from '@angular/core';
import { UmChipField } from '@universal-material/web';

const CHIP_FIELD_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UmChipFieldControlValueAccessor),
  multi: true,
};

@Directive({
  selector: 'u-chip-field[ngModel],u-chip-field[formControlName],u-chip-field[formControl]',
  providers: [CHIP_FIELD_VALUE_ACCESSOR],
  host: {
    '(change)': '_handleChange($any($event).target.value)',
  },
  standalone: false,
})
export class UmChipFieldControlValueAccessor implements ControlValueAccessor {

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private _renderer: Renderer2,
    private _elementRef: ElementRef<UmChipField>) {}

  writeValue(obj: any): void {
    this._elementRef.nativeElement.value = obj ?? [];
  }

  protected setProperty(key: string, value: any): void {
    this._renderer.setProperty(this._elementRef.nativeElement, key, value);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.setProperty('disabled', isDisabled);
  }

  _handleChange(value: []) {
    this.onChange(value);
  }
}
