import { AfterContentInit, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ScrollableContainerWrapper } from './scrollable-container-wrapper';

export abstract class ScrollBehavior implements AfterContentInit, OnChanges {
  @Input() scrollContainer: HTMLElement;
  protected _scrollableWrapper: ScrollableContainerWrapper;

  protected abstract _processBehavior: (scrollTop: number) => void;
  protected defaultTarget: EventTarget | any;

  protected _setScrollWrapper() {
    this._scrollableWrapper = new ScrollableContainerWrapper();
    this._scrollableWrapper.defaultTarget = this.defaultTarget;
    this._scrollableWrapper.container = this.scrollContainer;
    this._scrollableWrapper.scrollTop$.subscribe(this._processBehavior.bind(this));
  }

  ngAfterContentInit(): void {
    this._setScrollWrapper();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.scrollContainer) {
      this._scrollableWrapper.container = this.scrollContainer;
    }
  }
}
