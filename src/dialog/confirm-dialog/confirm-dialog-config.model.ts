import { InjectionToken } from '@angular/core';

import { DialogConfig } from '../dialog-config.model';
import { DefaultDialogConfig } from '../dialog.component';

export const CONFIRM_DIALOG_DEFAULT_OPTIONS = new InjectionToken<any>('CONFIRM_DIALOG_DEFAULT_OPTIONS');

export const DefaultConfirmDialogConfig: ConfirmDialogConfig = {
  ...DefaultDialogConfig,
  confirmLabel: 'OK',
  cancelLabel: 'Cancel',
}

export class ConfirmDialogConfig extends DialogConfig {
  title?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}
