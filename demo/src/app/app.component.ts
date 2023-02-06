import { Component, OnDestroy, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  showMenu = false;
  themes = [
    {
      name: 'Deep Purple & Amber',
      dark: false,
      className: 'deep-purple-amber'
    },
    {
      name: 'Indigo & Pink',
      dark: false,
      className: ''
    },
    {
      name: 'Pink & Blue-grey',
      dark: true,
      className: 'pink-blue-grey'
    },
    {
      name: 'Purple & Green',
      dark: true,
      className: 'purple-green'
    }
  ]

  private routerSubscription: Subscription;

  constructor(router: Router,
              @Inject(DOCUMENT) document: Document) {
    this.routerSubscription = router.events
      .pipe(
        filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.showMenu = false;
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

  setTheme(theme: {name: string, dark: boolean, className: string}): void {
    document.body.className = `u-android ${theme.className} ${theme.dark ? 'u-dark-mode' : ''}`;
  }
}
