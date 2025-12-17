import { ControlValueAccessor, DefaultValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, ElementRef, forwardRef, Provider, Renderer2 } from '@angular/core';
import { UmChipField, UmTypeahead } from '@universal-material/web';

const TYPEAHEAD_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => UmTypeaheadControlValueAccessor),
  multi: true,
};

@Directive({
  selector: 'u-typeahead[ngModel],u-typeahead[formControlName],u-typeahead[formControl]',
  providers: [TYPEAHEAD_VALUE_ACCESSOR],
  host: {
    '(change)': '$any(this)._handleChange($event.target.value)'
  },
  standalone: false,
})
export class UmTypeaheadControlValueAccessor implements ControlValueAccessor {

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor(private _renderer: Renderer2,
              private _elementRef: ElementRef<UmTypeahead>) {
  }

  writeValue(obj: any): void {
    this._elementRef.nativeElement.value = obj;
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
