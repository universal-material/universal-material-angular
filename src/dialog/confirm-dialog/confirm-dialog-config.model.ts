import { InjectionToken } from '@angular/core';

import { DialogConfig } from '../dialog-config.model';
import { DefaultDialogConfig } from '../dialog.component';

export const CONFIRM_DIALOG_DEFAULT_OPTIONS = new InjectionToken<any>('CONFIRM_DIALOG_DEFAULT_OPTIONS');

export const DefaultConfirmDialogConfig: ConfirmDialogConfig = {
  ...DefaultDialogConfig,
  confirmButton: {
    text: 'OK',
    appearance: 'flat',
    color: 'primary'
  },
  cancelButton: {
    text: 'Cancel',
    appearance: 'flat',
    color: 'primary'
  },
};

export class ConfirmDialogButtonConfig {
  text?: string;
  appearance?: string;
  color?: string;
}

export class ConfirmDialogConfig extends DialogConfig {
  title?: string;
  confirmButton?: ConfirmDialogButtonConfig;
  cancelButton?: ConfirmDialogButtonConfig;
}
