import { Directive, ElementRef } from '@angular/core';

import { ScrollBehavior } from '../util/scroll-behavior';

@Directive({
  selector: '[uDialogBody]'
})
export class DialogBodyDirective extends ScrollBehavior {
  dialog: any;

  constructor(_elementRef: ElementRef) {
    super();
    this.defaultTarget = _elementRef.nativeElement
  }

  _processBehavior = () => {

    if (!this.dialog || !this._scrollableWrapper) {
      return;
    }

    const scrollTop = this._scrollableWrapper.scrollTop;
    this.dialog.scrollTopDivider = !!scrollTop;

    if (scrollTop === null) {
      this.dialog.scrollBottomDivider = false;
      return;
    }

    const scrollBottom = scrollTop + this._scrollableWrapper.container.offsetHeight;
    this.dialog.scrollBottomDivider = scrollBottom !== this._scrollableWrapper.container.scrollHeight
  }
}
