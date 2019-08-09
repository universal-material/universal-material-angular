import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ToolbarBehavior } from './toolbar-behavior';

export interface ToolbarElevateWhenScrollOptions {
  offset: number;
}

const DefaultOptions: ToolbarElevateWhenScrollOptions = { offset: 0 };

@Directive({
  selector: '[uToolbarElevateWhenScroll]'
})
export class ToolbarElevateWhenScrollDirective extends ToolbarBehavior implements OnChanges {
  @Input('uToolbarElevateWhenScroll') options: ToolbarElevateWhenScrollOptions;
  private _innerOptions: ToolbarElevateWhenScrollOptions = DefaultOptions;

  constructor(_toolbarElementRef: ElementRef) {
    super(_toolbarElementRef);
    this._elementRef.nativeElement.style.transition = 'box-shadow 450ms';
  }

  protected _processBehavior = () => {
    if (this._scrollableWrapper.scrollTop > this._innerOptions.offset) {
      this._elementRef.nativeElement.classList.add('u-toolbar-elevated');
    } else {
      this._elementRef.nativeElement.classList.remove('u-toolbar-elevated');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.options) {
      this._innerOptions = {...DefaultOptions, ...this.options};
    }
  }
}
