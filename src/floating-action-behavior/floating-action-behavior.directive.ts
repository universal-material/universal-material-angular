import { Directive, ElementRef } from '@angular/core';
import { ScrollBehavior } from '../util/scroll-behavior';

@Directive({
  selector: '[uFloatingActionBehavior]'
})
export class FloatingActionBehaviorDirective extends ScrollBehavior {

  private _lastScrollY: number | null = null;
  override defaultTarget = window;

  constructor(private readonly elementRef: ElementRef) {
    super();

    this.elementRef.nativeElement.style.transition = 'transform 150ms linear';
  }

  protected _processBehavior = (scrollTop: number | null) => {
    if (this._lastScrollY === null) {
      this._lastScrollY = scrollTop;
      return;
    }

    if (this._lastScrollY < scrollTop!) {
      this.elementRef.nativeElement.style.transform = 'translateY(150%)';
    } else {
      this.elementRef.nativeElement.style.transform = '';
    }

    this._lastScrollY = scrollTop;
  };
}
