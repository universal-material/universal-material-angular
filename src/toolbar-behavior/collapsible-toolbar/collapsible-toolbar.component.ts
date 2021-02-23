import { Component, ContentChild, ElementRef, HostBinding } from '@angular/core';

import { ToolbarBehavior } from '../toolbar-behavior';

@Component({
  selector: 'u-collapsible-toolbar',
  templateUrl: './collapsible-toolbar.component.html',
  styleUrls: ['./collapsible-toolbar.component.scss']
})
export class CollapsibleToolbarComponent extends ToolbarBehavior {
  @ContentChild('toolbar') toolbarRef: ElementRef<HTMLElement>;
  @ContentChild('content') contentRef: ElementRef<HTMLElement>;
  @HostBinding('style.padding-top') get paddingTop(): string {
    return ((this.toolbarRef && this.toolbarRef.nativeElement.offsetHeight) || 0) + 1 + 'px';
  }
  private _toolbarCenter: HTMLElement;

  protected _setScrollWrapper() {
    if (!this.contentRef) {
      return;
    }

    this._toolbarCenter = this.toolbarRef.nativeElement.querySelector('.u-toolbar-center');

    super._setScrollWrapper();
    setTimeout(() => {
      this._toolbarCenter.style.transition = 'opacity 250ms';
    });
  }

  protected _processBehavior = (scrollTop: number) => {
    scrollTop = scrollTop || 0;
    if (!this.contentRef) {
      return;
    }

    if (scrollTop === 0) {
      this._toolbarCenter.style.opacity = '0';
      this.contentRef.nativeElement.style.opacity = '1';
      this.toolbarRef.nativeElement.style.border = 'none';
      return;
    }

    if (scrollTop <= this.contentRef.nativeElement.offsetHeight) {
      this.toolbarRef.nativeElement.style.border = 'none';
    } else {
      this.toolbarRef.nativeElement.style.border = '';
    }

    const scrollOffset = this.contentRef.nativeElement.offsetHeight * 0.8;

    if (scrollTop > scrollOffset) {
      this._toolbarCenter.style.opacity = '1';
      this.contentRef.nativeElement.style.opacity = '0';
      return;
    }

    this._toolbarCenter.style.opacity = '0';
    this.contentRef.nativeElement.style.opacity = (1 - scrollTop / scrollOffset) + '';
  };
}
