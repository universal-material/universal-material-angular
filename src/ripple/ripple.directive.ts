import { AfterViewInit, Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

import {Ripple, RippleConfigMap} from '@universal-material/core';

@Directive({
  selector: '[uRipple]'
})
export class RippleDirective implements AfterViewInit {

  constructor(private readonly _elementRef: ElementRef) {

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
    // const rippeConfig = this._getRippleConfig(this._elementRef.nativeElement);
    //
    // if (rippeConfig) {
    //   if (rippeConfig.subSelector) {
    //     const elements = this._elementRef.nativeElement.querySelectorAll(rippeConfig.subSelector);
    //
    //     for (let i = 0; i < elements.length; i++) {
    //       const childElement = elements[i];
    //       Ripple.attach(childElement, rippeConfig.config);
    //     }
    //   } else {
    //     Ripple.attach(this._elementRef.nativeElement, rippeConfig.config);
    //   }
    //
    // } else {
    //
    // }

    Ripple.attach(this._elementRef.nativeElement);
  }
}
