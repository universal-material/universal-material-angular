import { Directive, ElementRef, HostBinding, HostListener, Input, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

import { coerceBooleanProperty } from '../coercion/boolean.coercion';

@Directive({
  selector: '[uTextInput]'
})
export class TextInputDirective {

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

  @HostListener('(blur)') _blur = () => this._focusChanged(false);
  @HostListener('(focus)') _focus = () => this._focusChanged(true);
  @HostBinding('attr.disabled') get _disabledAttribute() {
    return this.disabled ? true : null;
  }

  constructor(@Optional() @Self() readonly ngControl: NgControl,
              elementRef: ElementRef) {
    elementRef.nativeElement.classList.add('u-text-input');
  }

  /** Callback for the cases where the focused state of the input changes. */
  _focusChanged(isFocused: boolean) {
    if (isFocused !== this.focused && (!this.readonly || !isFocused)) {
      this.focused = isFocused;
    }
  }
}
