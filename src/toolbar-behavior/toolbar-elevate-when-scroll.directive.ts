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
  @Input('uToolbarElevateWhenScroll') options: ToolbarElevateWhenScrollOptions | '' = '';
  private _innerOptions: ToolbarElevateWhenScrollOptions = DefaultOptions;

  constructor(private readonly _toolbarElementRef: ElementRef) {
    super();
    this._toolbarElementRef.nativeElement.style.transition = 'box-shadow 450ms';
  }

  protected _processBehavior = (scrollTop: number | null) => {
    if (scrollTop && scrollTop > this._innerOptions.offset) {
      this._toolbarElementRef.nativeElement.classList.add('u-toolbar-elevated');
      return;
    }

    this._toolbarElementRef.nativeElement.classList.remove('u-toolbar-elevated');
  }

  override ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this._innerOptions = {...DefaultOptions, ...this.options};
    }
  }
}
