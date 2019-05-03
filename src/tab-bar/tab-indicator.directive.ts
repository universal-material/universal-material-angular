import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[uTabIndicator]'
})
export class TabIndicatorDirective {

  constructor(readonly _elementRef: ElementRef) {
    this._elementRef.nativeElement.classList.add('u-tab-indicator');
  }
}
