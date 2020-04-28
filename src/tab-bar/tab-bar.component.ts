import {
  AfterViewChecked,
  AfterViewInit,
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
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TabComponent } from './tab.component';
import { smoothScrollLeft } from '../util/animations/smooth-scroll';
import { PreventableEvent } from '../util/events/preventable-event';

const defaultColor = 'primary';
const tabSelectionExtraSpace = 96;

export interface TabChangeEvent extends PreventableEvent {
  tabIndex: number;
}

@Component({
  selector: 'u-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss']
})
export class TabBarComponent implements AfterViewInit, AfterViewChecked, OnChanges {

  @ContentChildren(TabComponent) _tabs: QueryList<TabComponent>;
  @ViewChild('tabIndicator') _tabIndicator: ElementRef;
  @ViewChild('scrollContainer') _scrollContainer: ElementRef<HTMLElement>;
  @HostBinding('style.height') hostHeight: string;

  private _color: string;
  @Input() color: string;
  @Input() leftScrollIndicatorIconClass: string = 'mdi mdi-chevron-left';
  @Input() rightScrollIndicatorIconClass: string = 'mdi mdi-chevron-right';

  @Input() tabIndex = 0;
  @Output() tabIndexChange = new EventEmitter<number>();
  @Output() beforeChangeTab = new EventEmitter<TabChangeEvent>();

  private _tabsArray: TabComponent[];
  private _tabsClickSubscriptions: Subscription[] = [];
  private _activeTab: TabComponent;
  private _contentInitialized = false;
  private _windowResize$ = new Subject();
  private _scrollContainerScrollLeft = 0;

  tabBarClass: string;
  scrollContainerHeight: string;
  _showLeftScrollIndicator: boolean;
  _showRightScrollIndicator: boolean;

  @HostListener('window:resize') _windowResize = () => {
    this._windowResize$.next();
  }

  constructor(private readonly _elementRef: ElementRef) {
    this._windowResize$
      .pipe(debounceTime(100))
      .subscribe(() => {
        this._setScrollIndicators();
        this._updateTabIndicator();
      });

    this.color = _elementRef.nativeElement.getAttribute('color');
    this._updateColorClass();
    this.setHostAndContainerHeight();
  }

  private _updateTabs(tabs: QueryList<TabComponent>) {
    this._tabsClickSubscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });

    this._tabsClickSubscriptions.length = 0;

    this._tabsArray = tabs.toArray();
    this._tabsArray.forEach(tab => {
      this._tabsClickSubscriptions.push(tab._clicked
        .subscribe(() => {
          this._setTabIndexByTab(tab);
        }));
    });

    const lastActiveTabIndex = this._tabsArray.indexOf(this._activeTab);
    let newTabIndex = null;

    if (lastActiveTabIndex > -1 && this.tabIndex !== lastActiveTabIndex) {
      newTabIndex = lastActiveTabIndex;
    }

    if (this._activeTab) {
      this._activeTab.active = false;
      this._activeTab = null;
    }

    if (this.tabIndex > this._tabsArray.length - 1) {
      newTabIndex = this._tabsArray.length - 1;
    }

    if (newTabIndex !== null) {
      this.setTabIndexAndEmit(newTabIndex);
    }

    this.setActiveTab();
  }

  addToScroll(value: number) {
    this._setScrollLeft(this._scrollContainer.nativeElement.scrollLeft + value);
  }

  setTabIndexAndEmit(tabIndex: number) {
    this.tabIndex = tabIndex;
    this.tabIndexChange.emit(this.tabIndex);
  }

  ngAfterViewInit(): void {
    this._tabs.changes.subscribe(tabs => setTimeout(() => this._updateTabs(tabs)));
    this._scrollContainer.nativeElement.addEventListener('scroll', () => this._setScrollIndicators());
    this._updateTabIndicator();
    this._updateScrollPosition();
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      if (!this._contentInitialized) {
        this._updateTabs(this._tabs);
        this._contentInitialized = true;
      }
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!this._contentInitialized) {
      return;
    }

    if (changes.tabIndex) {
      this.setActiveTab();
    }

    if (changes.color) {
      this._updateColorClass();
    }
  }

  private _setTabIndexByTab(tab: TabComponent) {
    let tabIndex = 0;

    this._tabs.find((tabItem, index) => {
      if (tab === tabItem) {
        tabIndex = index;
        return true;
      }

      return false;
    });

    let defaultPrevented = false;
    this.beforeChangeTab.emit({
      tabIndex,
      preventDefault: () => {
        defaultPrevented = true;
      }
    });

    if (defaultPrevented) {
      return;
    }

    this.setTabIndexAndEmit(tabIndex);
    this.setActiveTab();
  }

  setActiveTab() {
    if (isNaN(this.tabIndex)) {
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

    this._setScrollIndicators();
  }

  private _setScrollIndicators() {
    const scrollElement = this._scrollContainer.nativeElement;

    this._showLeftScrollIndicator = scrollElement.scrollLeft !== 0;
    this._showRightScrollIndicator = scrollElement.scrollWidth - scrollElement.scrollLeft > scrollElement.offsetWidth + 1;
  }

  private _setScrollLeft(scrollLeft: number) {
    this._scrollContainerScrollLeft = scrollLeft;
    smoothScrollLeft(this._scrollContainer.nativeElement, scrollLeft);
  }

  private _updateColorClass() {
    const newColor = this.color || defaultColor;

    if (newColor === this._color) {
      return;
    }

    this._color = newColor;
    this.tabBarClass = `u-tab-bar u-tab-bar-${this._color}`;
  }

  setHostAndContainerHeight() {
    this.hostHeight = this.getTabBarHeight();
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
