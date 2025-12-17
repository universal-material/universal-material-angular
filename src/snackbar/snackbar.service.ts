import { Inject, Injectable, Optional } from '@angular/core';
import { SNACKBAR_DEFAULT_OPTIONS, SnackbarConfig } from './snackbar-config.model';
import { SnackbarDuration } from './snackbar-duration';
import { SnackbarRef } from './snackbar-ref.model';
import { UmSnackbar } from '@universal-material/web';
import { fromEvent, Observable } from 'rxjs';

const _defaultConfig: SnackbarConfig = {
  duration: SnackbarDuration.long
};

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  private readonly _defaultConfig: SnackbarConfig;

  constructor(@Optional() @Inject(SNACKBAR_DEFAULT_OPTIONS) userOptions: SnackbarConfig) {


    this._defaultConfig = { ..._defaultConfig, ... userOptions };

  }

  open(message: string, config?: SnackbarConfig): SnackbarRef {

    const snackbar = UmSnackbar.show({
      message: message,
      action: config?.actionLabel!,
      duration: config?.duration || this._defaultConfig.duration,
    });

    return {
      get message(): string {
        return snackbar.message
      },
      set message(value: string) {
        snackbar.message = value;
      },
      get action(): string {
        return snackbar.action
      },
      set action(value: string) {
        snackbar.action = value;
      },
      dismiss: () => snackbar.dismiss(),
      onAction: fromEvent(snackbar, 'actionClick')
    }
  }
}
