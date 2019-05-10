import { Component, ElementRef, HostBinding, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AnimationEvents } from '../util/animations/animation-events';
import { SnackbarRef } from './snackbar-ref.model';
import { SnackbarConfig } from './snackbar-config.model';

@Component({
  selector: 'u-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements SnackbarRef {

  @HostBinding('class.dismiss') dismissed = false;

  message: string;
  _config: SnackbarConfig;

  afterOpen: Observable<void> = new Subject();
  afterDismiss: Observable<void> = new Subject();
  onAction: Observable<void> = new Subject();

  constructor(private readonly _elementRef: ElementRef) {
    _elementRef.nativeElement.classList.add('u-snackbar');
  }

  _actionClick() {
    (this.onAction as Subject<void>).next();

    if (this._config.dismissOnAction) {
      (this.onAction as Subject<void>).complete();
      this.dismiss();
    }
  }

  dismiss() {
    this.dismissed = true;
    AnimationEvents.attachAnimationEndEvents(this._elementRef.nativeElement, this.dismissAnimationEnd.bind(this));
  }

  dismissAnimationEnd() {
    (this.afterDismiss as Subject<void>).next();
    (this.afterDismiss as Subject<void>).complete();
  }
}
