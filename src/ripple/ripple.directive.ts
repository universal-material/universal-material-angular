import {Directive, ElementRef} from '@angular/core';

import {Ripple} from '@universal-material/core';

@Directive({
  selector: '[umdRipple], .btn, .btn-flat, .btn-borderless, .btn-solid, .btn-raised, .btn-outline, .tab, .dropdown-item, .chip-remove, .chip-hover'
})
export class RippleDirective {
  constructor(private readonly elementRef: ElementRef) {
    new Ripple(this.elementRef.nativeElement);
  }
}
