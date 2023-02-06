import { InjectionToken } from '@angular/core';

import { DialogConfig } from '../dialog-config.model';
import { DefaultDialogConfig } from '../dialog-base.component';

export const CONFIRM_DIALOG_DEFAULT_OPTIONS = new InjectionToken<any>('CONFIRM_DIALOG_DEFAULT_OPTIONS');

export const DefaultConfirmDialogConfig: ConfirmDialogConfig = {
  ...DefaultDialogConfig,
  confirmButton: {
    text: 'OK',
    appearance: 'text'
  },
  cancelButton: {
    text: 'Cancel',
    appearance: 'text'
  },
};

export interface ConfirmDialogButtonConfig {
  text?: string;
  appearance?: string;
  color?: string;
}

export class ConfirmDialogConfig implements DialogConfig {
  title?: string;
  confirmButton?: ConfirmDialogButtonConfig;
  cancelButton?: ConfirmDialogButtonConfig;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
}
