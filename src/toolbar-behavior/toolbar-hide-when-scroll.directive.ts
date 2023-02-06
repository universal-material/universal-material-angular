import { Directive, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { ToolbarBehavior } from './toolbar-behavior';

export interface ToolbarHideWhenScrollOptions {
  autoElevate?: boolean,
  offset?: number;
}

const DefaultOptions: ToolbarHideWhenScrollOptions = {
  autoElevate: true,
  offset: 0
};

@Directive({
  selector: '[uToolbarHideWhenScroll]'
})
export class ToolbarHideWhenScrollDirective extends ToolbarBehavior implements OnChanges {

  @Input() fixedContent: HTMLElement | null = null;
  @Output() sticky = new EventEmitter<boolean>();
  @Input('uToolbarHideWhenScroll') options: ToolbarHideWhenScrollOptions | '' = DefaultOptions;
  private _innerOptions = DefaultOptions;

  previousTranslate = 0;
  previousScrollTop = 0;

  constructor(private readonly _toolbarElementRef: ElementRef) {
    super();
    this._toolbarElementRef.nativeElement.style.willChange = 'transform';
  }

  override ngAfterContentInit(): void {
    super.ngAfterContentInit();
    if (this._innerOptions.autoElevate) {
      if (this._toolbarElementRef.nativeElement.style.transition) {
        this._toolbarElementRef.nativeElement.style.transition += ', box-shadow 450ms';
      } else {
        this._toolbarElementRef.nativeElement.style.transition = 'box-shadow 450ms';
      }
    }
  }

  protected _processBehavior = (newScrollTop: number | null) => {
    newScrollTop = newScrollTop || 0;
    let toolbarHeight = this._toolbarElementRef.nativeElement.offsetHeight;

    if (this.fixedContent) {
      toolbarHeight -= this.fixedContent.offsetHeight;
    }

    let newTranslate = this.previousTranslate + (newScrollTop - this.previousScrollTop);
    this.previousScrollTop = newScrollTop;

    if (newScrollTop <= this._innerOptions.offset!) {

      this.sticky.emit(false);
      if (this._innerOptions.autoElevate) {
        this._toolbarElementRef.nativeElement.classList.remove('u-toolbar-elevated');
      }
      newTranslate = 0;
    } else if (newTranslate > toolbarHeight) {
      newTranslate = toolbarHeight;
    } else if (newTranslate < 0) {
      newTranslate = 0;
    }

    if (this.previousTranslate === newTranslate)  {
      return;
    }

    if (this.previousTranslate === toolbarHeight ||
      (this.fixedContent && newTranslate === toolbarHeight)) {
      this.sticky.emit(true);

      if (this._innerOptions.autoElevate) {
        this._toolbarElementRef.nativeElement.classList.add('u-toolbar-elevated');
      }

    } else if (newTranslate === toolbarHeight) {
      this.sticky.emit(false);

      if (this._innerOptions.autoElevate) {
        this._toolbarElementRef.nativeElement.classList.remove('u-toolbar-elevated');
      }
    }

    this.previousTranslate = newTranslate;
    this._toolbarElementRef.nativeElement.style.transform = 'translate3d(0, ' + -newTranslate + 'px, 0)';
  }

  override ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this._innerOptions = {...DefaultOptions, ...this.options};
    }
  }
}
