import { ApplicationRef, ComponentRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { SnackbarComponent } from './snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarQueueService {
  private static _queue: ComponentRef<SnackbarComponent>[] = [];
  private static _showingSnackbar: ComponentRef<SnackbarComponent> = null;

  constructor(private readonly _appRef: ApplicationRef) {

  }

  add(snackbar: ComponentRef<SnackbarComponent>) {
    SnackbarQueueService._queue.unshift(snackbar);

    if (!SnackbarQueueService._showingSnackbar || SnackbarQueueService._showingSnackbar.instance._config.dismissWhenOpenAnotherSnackbar) {
      this._showNext();
    }
  }

  private _showNext() {
    if (!SnackbarQueueService._queue.length) {
      return;
    }

    if (SnackbarQueueService._showingSnackbar) {
      SnackbarQueueService._showingSnackbar.instance.dismiss();
      return;
    }

    const snackbarComponentRef = SnackbarQueueService._queue.pop();
    const snackbar = snackbarComponentRef.instance;
    SnackbarQueueService._showingSnackbar = snackbarComponentRef;

    (snackbar.afterOpen as Subject<void>).next();
    (snackbar.afterOpen as Subject<void>).complete();
    snackbar.afterDismiss.subscribe(() => {
      this._appRef.detachView(snackbarComponentRef.hostView);
      snackbarComponentRef.destroy();

      SnackbarQueueService._showingSnackbar = null;
      this._showNext();
    });

    if (snackbar._config.duration) {
      setTimeout(() => {
        if (!snackbar.dismissed) {
          snackbar.dismiss();
        }
      }, snackbar._config.duration);
    }

    document
      .querySelector('body')
      .appendChild(snackbarComponentRef.location.nativeElement);
  }
}
