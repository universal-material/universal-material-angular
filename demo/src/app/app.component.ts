import { Component, OnDestroy, Inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { UniversalMaterialModule } from '@universal-material/angular';

import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavigationComponent,
    UniversalMaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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
