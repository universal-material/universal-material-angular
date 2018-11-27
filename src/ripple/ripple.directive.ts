import {AfterViewInit, Directive, ElementRef} from '@angular/core';

import {Ripple, RippleConfigMap} from '@universal-material/core';

@Directive({
  selector: '[uRipple], .btn, .btn-flat, .btn-borderless, .btn-solid, .btn-raised, .btn-outline, .btn-floating, .tab, .dropdown-item, .chip-remove, .chip-hover, .checkbox, .radio, .switch, .list-item, .list-hover, .text-input.dropdown-toggle'
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
      if (rippeConfig.subSelector) {
        const elements = this.elementRef.nativeElement.querySelectorAll(rippeConfig.subSelector);

        for (let i = 0; i < elements.length; i++) {
          const childElement = elements[i];
          Ripple.attach(childElement, rippeConfig.config);
        }
      } else {
        Ripple.attach(this.elementRef.nativeElement, rippeConfig.config);
      }

    } else {
      Ripple.attach(this.elementRef.nativeElement);
    }
  }
}
