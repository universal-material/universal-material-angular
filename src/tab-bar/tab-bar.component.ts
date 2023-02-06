import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {TabComponent} from './tab.component';
import {smoothScrollLeft} from '../util/animations/smooth-scroll';
import {PreventableEvent} from '../util/events/preventable-event';

const tabSelectionExtraSpace = 96;

export interface TabChangeEvent {
  tabIndex: number;
  tabId: any;
}

export interface BeforeTabChangeEvent extends TabChangeEvent, PreventableEvent {
  tabIndex: number;
  tabId: any;
}

@Component({
  selector: 'u-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabBarComponent implements AfterViewInit, OnChanges {

  @ContentChildren(TabComponent) _tabs!: QueryList<TabComponent>;
  @ViewChild('tabIndicator') _tabIndicator!: ElementRef;
  @ViewChild('scrollContainer') _scrollContainer!: ElementRef<HTMLElement>;
  @HostBinding('style.height') hostHeight: string;

  private _tabBarClass!: string;
  @Input() leftScrollIndicatorIconClass: string = 'mdi mdi-chevron-left';
  @Input() rightScrollIndicatorIconClass: string = 'mdi mdi-chevron-right';

  @Input() activeTabId: any;
  @Input() tabIndex: number | null = 0;
  @Output() tabIndexChange = new EventEmitter<number | null>();
  @Output() beforeChangeTab = new EventEmitter<BeforeTabChangeEvent>();
  @Output() afterChangeTab = new EventEmitter<TabChangeEvent>();

  private _tabsArray!: TabComponent[];
  private _tabsClickSubscriptions: Subscription[] = [];
  private _activeTab: TabComponent | null = null;
  private _contentInitialized = false;
  private _windowResize$ = new Subject<void>();
  private _scrollContainerScrollLeft = 0;

  _innerTabBarClass!: string;
  scrollContainerHeight!: string;
  _showLeftScrollIndicator = false;
  _showRightScrollIndicator = false;

  @HostListener('window:resize') _windowResize = () => {
    this._windowResize$.next();
  }

  constructor(private readonly _elementRef: ElementRef,
              private readonly _changeDetectorRef: ChangeDetectorRef) {
    this._windowResize$
      .pipe(debounceTime(100))
      .subscribe(() => {
        this._setScrollIndicators();
        this._updateTabIndicator();
      });

    this.hostHeight = this.getTabBarHeight();
  }

  private _updateTabs(tabs: TabComponent[]) {
    this._tabsClickSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });

    this._tabsClickSubscriptions.length = 0;

    this._tabsArray = tabs;
    this._tabsArray.forEach(tab => {
      this._tabsClickSubscriptions.push(tab._clicked
        .subscribe(() => {
          this._setTabIndexByTab(tab);
        }));
    });

    const lastActiveTabIndex = this._tabsArray.indexOf(this._activeTab!);
    let newTabIndex = null;

    if (lastActiveTabIndex > -1 && this.tabIndex !== lastActiveTabIndex) {
      newTabIndex = lastActiveTabIndex;
    }

    if (this._activeTab) {
      this._activeTab.active = false;
      this._activeTab = null;
    }

    if (this.tabIndex! > this._tabsArray.length - 1) {
      newTabIndex = this._tabsArray.length - 1;
    }

    if (newTabIndex !== null) {
      this.setTabIndexAndEmit(newTabIndex);
    }

    if (this.activeTabId) {
      this._setTabIndexByTabId(this.activeTabId)
    }

    this._setActiveTab();
  }

  addToScroll(value: number) {
    this._setScrollLeft(this._scrollContainer.nativeElement.scrollLeft + value);
  }

  setTabIndexAndEmit(tabIndex: number | null) {
    this.tabIndex = tabIndex;
    this.tabIndexChange.emit(this.tabIndex);
  }

  ngAfterViewInit(): void {

    this._tabs.changes
      .pipe(debounceTime(250))
      .subscribe(tabs => this._updateTabs(tabs.toArray()));

    this._scrollContainer.nativeElement.addEventListener('scroll', () => this._setScrollIndicators());
    this._updateTabs(this._tabs.toArray())
    this._updateTabIndicator();
    this._updateScrollPosition();
    this._changeDetectorRef.detectChanges();
    this._contentInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!this._contentInitialized) {
      return;
    }

    if (changes['tabIndex']) {
      this._setActiveTab();
    }

    if (changes['activeTabId']) {
      this._setTabIndexByTabId(this.activeTabId);
      this._setActiveTab();
    }
  }

  private _setTabIndexByExpression(expression: (tab: TabComponent) => boolean) {
    let tabIndex: number | null = null;

    const tab = this._tabs.find((tab, index) => {
      if (expression(tab)) {
        tabIndex = index;
        return true;
      }

      return false;
    });

    const tabChangeEvent = {
      tabIndex: tabIndex!,
      tabId: tab && tab.tabId,
    };

    let defaultPrevented = false;
    this.beforeChangeTab.emit({
      ...tabChangeEvent,
      preventDefault: () => {
        defaultPrevented = true;
      }
    });

    if (defaultPrevented) {
      return;
    }

    this.setTabIndexAndEmit(tabIndex);
    this._setActiveTab();
    this.afterChangeTab.emit(tabChangeEvent);
  }

  private _setTabIndexByTabId(tabId: any) {
    this._setTabIndexByExpression((tab) => tab.tabId === tabId);
  }

  private _setTabIndexByTab(tab: TabComponent) {
    this._setTabIndexByExpression((tabItem) => tab === tabItem);
  }

  _setActiveTab() {
    if (!this._tabsArray || !this._tabsArray.length) {
      return;
    }

    if (this.tabIndex == null || isNaN(this.tabIndex)) {
      if (this._activeTab) {
        this._activeTab.active = false;
        this._activeTab = null;
      }

      return;
    }

    if (this._activeTab) {
      if (this._activeTab === this._tabsArray[this.tabIndex]) {
        return;
      }

      this._activeTab.active = false;
    }

    this._activeTab = this._tabsArray[this.tabIndex];
    this._activeTab.active = true;
    this._updateTabIndicator();
    this._updateScrollPosition();
    this._changeDetectorRef.detectChanges();
  }

  private _updateTabIndicator() {
    if (!this._activeTab) {
      this._tabIndicator.nativeElement.style.left = '0';
      return;
    }

    const tab = this._activeTab._elementRef.nativeElement;
    this._tabIndicator.nativeElement.style.left = `${tab.offsetLeft}px`;
    this._tabIndicator.nativeElement.style.width = `${tab.offsetWidth}px`;
  }

  private _updateScrollPosition() {

    this._setScrollIndicators();

    if (!this._activeTab) {
      return;
    }

    const tabElement = this._activeTab._elementRef.nativeElement;
    const scrollElement = this._scrollContainer.nativeElement;
    const scrollLeft = this._scrollContainer.nativeElement.scrollLeft;

    if (tabElement.offsetLeft - scrollLeft - tabSelectionExtraSpace < 0) {
      this._setScrollLeft(Math.max(tabElement.offsetLeft - tabSelectionExtraSpace, 0));
    } else if (tabElement.offsetLeft + tabElement.offsetWidth + tabSelectionExtraSpace > scrollLeft + scrollElement.offsetWidth) {
      this._setScrollLeft(
        Math.min(tabElement.offsetLeft + tabElement.offsetWidth + tabSelectionExtraSpace - scrollElement.offsetWidth, scrollElement.scrollWidth));
    }
  }

  private _setScrollIndicators() {
    const scrollElement = this._scrollContainer.nativeElement;

    this._showLeftScrollIndicator = scrollElement.scrollLeft !== 0;
    this._showRightScrollIndicator = scrollElement.scrollWidth - scrollElement.scrollLeft > scrollElement.offsetWidth + 1;
    this._changeDetectorRef.detectChanges();
  }

  private _setScrollLeft(scrollLeft: number) {
    this._scrollContainerScrollLeft = scrollLeft;
    smoothScrollLeft(this._scrollContainer.nativeElement, scrollLeft);
  }

  getTabBarHeight() {
    const tabBar = document.createElement('div');
    tabBar.className = 'u-tab-bar';
    tabBar.style.visibility = 'hidden';
    document.body.appendChild(tabBar);
    const height = getComputedStyle(tabBar).height;

    document.body.removeChild(tabBar);

    return height;
  }
}
