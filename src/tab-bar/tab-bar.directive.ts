import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter, HostListener,
  Input, OnChanges,
  Output,
  QueryList, SimpleChanges
} from '@angular/core';

import { TabComponent } from './tab.component';
import { TabIndicatorDirective } from './tab-indicator.directive';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[uTabBar]'
})
export class TabBarDirective implements AfterContentInit, OnChanges {

  @ContentChildren(TabComponent) _tabs: QueryList<TabComponent>;
  @ContentChild(TabIndicatorDirective) _tabIndicator: TabIndicatorDirective;

  @Input() tabIndex: number;
  @Output() tabIndexChange = new EventEmitter<number>();

  private _tabsArray: TabComponent[];
  private _activeTab: TabComponent;
  private _contentInitialized = false;
  private _windowResize$ = new Subject();

  @HostListener('window:resize') private _windowResize = () => {
    this._windowResize$.next();
  }

  constructor(private readonly _elementRef: ElementRef) {
    _elementRef.nativeElement.classList.add('u-tab-bar');
    this._windowResize$
      .pipe(debounceTime(100))
      .subscribe(() => this._updateTabIndicator());
  }

  ngAfterContentInit(): void {
    this._contentInitialized = true;
    this._tabsArray = this._tabs.toArray();
    this.setActiveTab();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!this._contentInitialized) {
      return;
    }

    if (changes.tabIndex) {
      this.setActiveTab();
    }
  }

  setTabIndexByTab(tab: TabComponent) {
    this.tabIndex = this._tabsArray.indexOf(tab);
    this.tabIndexChange.emit(this.tabIndex);
    this.setActiveTab();
  }

  setActiveTab() {
    if (isNaN(this.tabIndex)) {
      this.tabIndex = 0;
      this.tabIndexChange.emit(0);
    }

    if (this._activeTab) {
      if (this._activeTab === this._tabsArray[this.tabIndex]) {
        return;
      }

      this._activeTab.active = false;
    }

    this._activeTab = this._tabsArray[this.tabIndex];
    this._activeTab.active = true;

    setTimeout(() => this._updateTabIndicator(), 100);
  }

  private _updateTabIndicator() {

    const tabBounds = this._activeTab._elementRef.nativeElement.getBoundingClientRect();
    const offset = tabBounds.left - this._elementRef.nativeElement.getBoundingClientRect().left;

    this._tabIndicator._elementRef.nativeElement.style.left = offset + 'px';
    this._tabIndicator._elementRef.nativeElement.style.width = tabBounds.width + 'px';
  }
}
