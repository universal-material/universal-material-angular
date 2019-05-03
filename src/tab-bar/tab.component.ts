import { Component, ElementRef, forwardRef, HostBinding, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { TabBarDirective } from './tab-bar.directive';

@Component({
  selector: 'u-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {

  @HostBinding('class.active') active: boolean;
  @HostListener('click') _click = () => {
    this._tabBar.setTabIndexByTab(this);
  }

  constructor(readonly _elementRef: ElementRef,
              @Inject(DOCUMENT) private readonly _document: any,
              @Inject(forwardRef(() => TabBarDirective)) readonly _tabBar: TabBarDirective) {
    _elementRef.nativeElement.classList.add('u-tab');
  }
}
