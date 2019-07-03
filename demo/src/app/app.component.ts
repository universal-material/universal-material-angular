import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  showMenu = false;

  private routerSubscription: Subscription;

  constructor(router: Router) {
    this.routerSubscription = router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showMenu = false;
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
