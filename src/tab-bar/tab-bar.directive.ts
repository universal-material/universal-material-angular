import { Directive, effect, ElementRef, model } from '@angular/core';

import { UmTabBar } from '@universal-material/web';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: 'u-tab-bar'
})
export class TabBarDirective {

  #activeTabIndex = 0;
  readonly #tabBar: UmTabBar;
  readonly #mutationObserver: MutationObserver;

  #justSetTabIndex = false;

  readonly activeTabIndex = model(0);

  #tabChangedSubject = new Subject<void>();

  constructor(elementRef: ElementRef<UmTabBar>) {
    this.#tabBar = elementRef.nativeElement;

    effect(() => {
      const index = this.activeTabIndex();
      this.#activeTabIndex = index;
      this.#tabBar.activeTabIndex = index;
      this.#justSetTabIndex = true;
      this.#tabChangedSubject.next();
    });

    elementRef.nativeElement.addEventListener('change', () =>
      this.activeTabIndex.set(this.#tabBar.activeTabIndex));
    this.#mutationObserver = new MutationObserver(() => this.#tabChangedSubject.next());
    this.#mutationObserver.observe(elementRef.nativeElement, {characterData: true, childList: true, subtree: true});

    this.#tabChangedSubject
      .pipe(debounceTime(100))
      .subscribe(() => this.#ensureCorrectTabIndex());
  }

  #ensureCorrectTabIndex() {
    if (this.#activeTabIndex === this.#tabBar.activeTabIndex) {
      return;
    }

    if (!this.#justSetTabIndex) {
      this.#activeTabIndex = this.#tabBar.activeTabIndex;
      this.activeTabIndex.set(this.#activeTabIndex);
      return;
    }

    this.#justSetTabIndex = false;
    this.#tabBar.activeTabIndex = this.#activeTabIndex;

    if (this.#activeTabIndex === this.#tabBar.activeTabIndex) {
      return;
    }

    this.#activeTabIndex = this.#tabBar.activeTabIndex;
    this.activeTabIndex.set(this.#activeTabIndex);
  }
}
