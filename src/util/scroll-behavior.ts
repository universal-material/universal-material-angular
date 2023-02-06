import { AfterContentInit, Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ScrollableContainerWrapper } from './scrollable-container-wrapper';

@Directive()
export abstract class ScrollBehavior implements AfterContentInit, OnChanges {
  @Input() scrollContainer: HTMLElement | null = null;
  protected _scrollableWrapper!: ScrollableContainerWrapper;

  protected abstract _processBehavior: (scrollTop: number | null) => void;
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
    if (changes['scrollContainer']) {
      this._scrollableWrapper.container = this.scrollContainer;
    }
  }
}
