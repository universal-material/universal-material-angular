import { Directive, ElementRef, forwardRef, HostListener, Inject, Optional, Self } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';

import { TextInputBase } from '../shared/text-input-base';

const U_CHIP_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ChipInputDirective),
  multi: true
};

@Directive({
  selector: '[uChipInput]',
  providers: [U_CHIP_INPUT_VALUE_ACCESSOR]
})
export class ChipInputDirective extends TextInputBase {

  protected _inputValueAccessor: { value: any };

  enterPress = new Subject();
  @HostListener('keydown.enter') keypressEnter = () => {
    this.enterPress.next();
  }

  get value(): string { return this._inputValueAccessor.value; }
  set value(value: string) {
    if (value !== this.value) {
      this._inputValueAccessor.value = value;
    }
  }

  constructor(@Optional() @Self() ngControl: NgControl,
              @Optional() @Inject(U_CHIP_INPUT_VALUE_ACCESSOR) inputValueAccessor: any,
              elementRef: ElementRef) {
    super(ngControl, null, elementRef);

    this._inputValueAccessor = inputValueAccessor || elementRef.nativeElement;
    elementRef.nativeElement.classList.add('u-chip-input');
  }
}
