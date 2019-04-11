import { ElementRef, HostBinding, HostListener, Inject, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

import { FormFieldComponent } from '../form-field/form-field.component';
import { coerceBooleanProperty } from '../coercion/boolean.coercion';

export abstract class TextInputBase {
  focused = false;

  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);

    // Browsers may not fire the blur event if the input is disabled too quickly.
    // Reset from here to ensure that the element doesn't become stuck.
    if (this.focused) {
      this.focused = false;
    }
  }
  protected _disabled = false;

  /** Whether the element is readonly. */
  @Input()
  get readonly(): boolean { return this._readonly; }
  set readonly(value: boolean) { this._readonly = coerceBooleanProperty(value); }
  private _readonly = false;

  get empty(): boolean {
    return !this._elementRef.nativeElement.value;
  }

  @HostListener('blur') _blur = () => this._focusChanged(false);
  @HostListener('focus') _focus = () => this._focusChanged(true);
  @HostBinding('attr.disabled') get _disabledAttribute() {
    return this.disabled ? true : null;
  }

  protected constructor(readonly ngControl: NgControl,
              formField: FormFieldComponent,
              protected readonly _elementRef: ElementRef) {

    if (formField) {
      formField._input = this;
    }
  }

  /** Callback for the cases where the focused state of the input changes. */
  _focusChanged(isFocused: boolean) {
    if (isFocused !== this.focused && (!this.readonly || !isFocused)) {
      this.focused = isFocused;
    }
  }
}
