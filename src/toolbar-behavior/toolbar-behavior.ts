import { AfterContentInit, ElementRef, Input, OnDestroy } from '@angular/core';

import { ScrollableContainerWrapper } from '../util/scrollable-container-wrapper';

export abstract class ToolbarBehavior implements AfterContentInit, OnDestroy {
  @Input() scrollContainer: HTMLElement;
  protected _scrollableWrapper: ScrollableContainerWrapper;

  protected constructor(protected readonly _elementRef: ElementRef) {

  }

  protected abstract _processBehavior: () => void;

  protected _setScrollWrapper() {
    this._scrollableWrapper = new ScrollableContainerWrapper(this.scrollContainer || window);
    this._scrollableWrapper.container.addEventListener('scroll', this._processBehavior);
    this._processBehavior();
  }

  ngAfterContentInit(): void {
    this._setScrollWrapper();
  }

  ngOnDestroy(): void {
    this._scrollableWrapper.container.removeEventListener('scroll', this._processBehavior);
  }
}
