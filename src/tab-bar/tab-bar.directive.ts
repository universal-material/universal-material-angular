import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

import { UmTabBar } from '@universal-material/web';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: 'u-tab-bar',
  standalone: true
})
export class TabBarDirective {

  #activeTabIndex = 0;
  readonly #tabBar: UmTabBar;
  readonly #mutationObserver: MutationObserver;

  #justSetTabIndex = false;

  @Input()
  get activeTabIndex(): number {
    return this.#activeTabIndex;
  }
  set activeTabIndex(index: number) {
    this.#activeTabIndex = index;
    this.#tabBar.activeTabIndex = index;
    this.#justSetTabIndex = true;
    this.#tabChangedSubject.next();
  }

  #tabChangedSubject = new Subject<void>();

  @Output() activeTabIndexChange = new EventEmitter<number>();

  constructor(elementRef: ElementRef<UmTabBar>) {
    this.#tabBar = elementRef.nativeElement;

    elementRef.nativeElement.addEventListener('change', () => this.activeTabIndexChange.emit(this.#tabBar.activeTabIndex));
    this.#mutationObserver = new MutationObserver(() => this.#tabChangedSubject.next());
    this.#mutationObserver.observe(elementRef.nativeElement, {characterData: true, childList: true, subtree: true});

    this.#tabChangedSubject
      .pipe(debounceTime(100))
      .subscribe(() => this.ensureCorrectTabIndex());
  }

  private ensureCorrectTabIndex() {
    if (this.#activeTabIndex === this.#tabBar.activeTabIndex) {
      return;
    }

    if (!this.#justSetTabIndex) {
      this.#activeTabIndex = this.#tabBar.activeTabIndex;
      this.activeTabIndexChange.next(this.#activeTabIndex);
      return;
    }

    this.#justSetTabIndex = false;
    this.#tabBar.activeTabIndex = this.#activeTabIndex;

    if (this.#activeTabIndex === this.#tabBar.activeTabIndex) {
      return;
    }

    this.#activeTabIndex = this.#tabBar.activeTabIndex;
    this.activeTabIndexChange.next(this.#activeTabIndex);
  }
}
