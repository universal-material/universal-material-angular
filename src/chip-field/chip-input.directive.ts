import { Directive, ElementRef, HostListener } from '@angular/core';
import { Subject } from 'rxjs';

import { TextInputBase } from '../shared/text-input-base';

@Directive({
  selector: '[uChipInput]'
})
export class ChipInputDirective extends TextInputBase {

  enterKeyDown = new Subject<void>();
  backspaceKeyDown = new Subject<void>();

  @HostListener('keydown.enter') keypressEnter = () => {
    this.enterKeyDown.next();
  }

  @HostListener('keydown.backspace') keypressBackspace = () => {
    this.backspaceKeyDown.next();
  }

  get value(): string {
    return this._elementRef.nativeElement.value;
  }

  set value(value: string) {
    if (value !== this.value) {
      this._elementRef.nativeElement.value = value;
    }
  }

  constructor(elementRef: ElementRef) {
    super(null, null, elementRef);

    elementRef.nativeElement.classList.add('u-chip-input');
  }
}
