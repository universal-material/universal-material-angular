import { InjectionToken } from '@angular/core';

import { DialogConfig } from '../dialog-config.model';
import { DefaultDialogConfig } from '../dialog-base.component';
import { UmButtonColor, UmButtonVariant } from '@universal-material/web';

export const CONFIRM_DIALOG_DEFAULT_OPTIONS = new InjectionToken<any>('CONFIRM_DIALOG_DEFAULT_OPTIONS');

export const DefaultConfirmDialogConfig: ConfirmDialogConfig = {
  ...DefaultDialogConfig,
  confirmButton: {
    text: 'OK',
    variant: 'text'
  },
  cancelButton: {
    text: 'Cancel',
    variant: 'text'
  },
};

export interface ConfirmDialogButtonConfig {
  text?: string;
  variant?: UmButtonVariant;
  color?: UmButtonColor;
}

export class ConfirmDialogConfig implements DialogConfig {
  title?: string;
  confirmButton?: ConfirmDialogButtonConfig;
  cancelButton?: ConfirmDialogButtonConfig;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
}
