import {AfterViewInit, Directive, ElementRef} from '@angular/core';

import {Ripple} from 'universal-material';

const childSelectorMap = {
  'list-hover': '.list-item',
  'list-item': '.list-item-hover'
};

@Directive({
  selector: '[umdRipple], .btn, .btn-flat, .btn-borderless, .btn-solid, .btn-raised, .btn-outline, .list-hover, .list-item, .tab, .dropdown-item, .radio .selection-control, .checkbox .selection-control, .switch .check-indicator, .chip-remove, .chip-hover'
})
export class RippleDirective implements AfterViewInit {
  constructor(private readonly elementRef: ElementRef) {
    new Ripple(this.elementRef.nativeElement);
  }
}
