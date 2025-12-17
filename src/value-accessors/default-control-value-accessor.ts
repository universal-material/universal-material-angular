import { Directive, ElementRef, Inject, Optional, Renderer2 } from '@angular/core';
import { COMPOSITION_BUFFER_MODE, DefaultValueAccessor, NgControl } from '@angular/forms';

@Directive({
  selector: 'u-text-field[ngModel],u-text-field[formControlName],u-text-field[formControl],u-text-area[ngModel],u-text-area[formControlName],u-text-area[formControl],u-button-field[ngModel],u-button-field[formControlName],u-button-field[formControl],u-search[ngModel],u-search[formControlName],u-search[formControl]',
  standalone: false,
})
export class UmDefaultControlValueAccessor extends DefaultValueAccessor {
  constructor(renderer: Renderer2,
              elementRef: ElementRef,
              @Optional() @Inject(COMPOSITION_BUFFER_MODE) _compositionMode: boolean,
              @Optional() ngControl: NgControl) {
    super(renderer, elementRef, _compositionMode);

    if (!ngControl || ngControl.valueAccessor) {
      return;
    }

    ngControl.valueAccessor = this;
  }
}
