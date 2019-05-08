import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { TabComponent } from './tab.component';

@Component({
  selector: 'u-tab-bar',
  templateUrl: './tab-bar.component.html'
})
export class TabBarComponent implements AfterContentInit, OnInit, OnChanges {

  @ContentChildren(TabComponent) _tabs: QueryList<TabComponent>;
  @ViewChild('tabIndicator') _tabIndicator: ElementRef;

  @Input() tabIndex: number;
  @Output() tabIndexChange = new EventEmitter<number>();

  private _tabsArray: TabComponent[];
  private _tabsClickSubscriptions: Subscription[] = [];
  private _activeTab: TabComponent;
  private _contentInitialized = false;
  private _windowResize$ = new Subject();

  @HostListener('window:resize') _windowResize = () => {
    this._windowResize$.next();
  }

  constructor(private readonly _elementRef: ElementRef) {
    _elementRef.nativeElement.classList.add('u-tab-bar');
    this._windowResize$
      .pipe(debounceTime(100))
      .subscribe(() => this._updateTabIndicator());
  }

  ngOnInit() {

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

  setTabIndexAndEmit(tabIndex: number) {
    this.tabIndex = tabIndex;
    this.tabIndexChange.emit(this.tabIndex);
  }

  ngAfterContentInit(): void {
    this._contentInitialized = true;
    this._updateTabs(this._tabs);
    this._tabs.changes.subscribe(tabs => setTimeout(() => this._updateTabs(tabs)));
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!this._contentInitialized) {
      return;
    }

    if (changes.tabIndex) {
      this.setActiveTab();
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

    this.setTabIndexAndEmit(tabIndex);
    this.setActiveTab();
  }

  setActiveTab() {
    if (isNaN(this.tabIndex)) {
      this.setTabIndexAndEmit(0);
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

    this._tabIndicator.nativeElement.style.left = offset + 'px';
    this._tabIndicator.nativeElement.style.width = tabBounds.width + 'px';
  }
}
