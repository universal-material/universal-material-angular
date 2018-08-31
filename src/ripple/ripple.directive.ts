import {AfterViewInit, Directive, ElementRef} from '@angular/core';

import {Ripple, RippleConfigMap} from '@universal-material/core';

@Directive({
  selector: '[umdRipple], .btn, .btn-flat, .btn-borderless, .btn-solid, .btn-raised, .btn-outline, .tab, .dropdown-item, .chip-remove, .chip-hover, .checkbox, .radio, .switch, .list-item, .list-hover'
})
export class RippleDirective implements AfterViewInit {
  constructor(private readonly elementRef: ElementRef) {

  }

  private _getRippleConfig(element: HTMLElement) {
    for (let i = 0; i < RippleConfigMap.length; i++) {
      const rippleConfig = RippleConfigMap[i];
      if (element.matches(rippleConfig.selector)) {
        return rippleConfig;
      }
    }
  }

  ngAfterViewInit(): void {
    const rippeConfig = this._getRippleConfig(this.elementRef.nativeElement);

    if (rippeConfig) {
      let element = this.elementRef.nativeElement;
      if (rippeConfig.subSelector) {
        element = this.elementRef.nativeElement.querySelector(rippeConfig.subSelector);
      }
      new Ripple(element, rippeConfig.config);
    } else {
      new Ripple(this.elementRef.nativeElement);
    }
  }
}
