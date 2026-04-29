import { InjectionToken } from '@angular/core';

export const DIALOG_DEFAULT_OPTIONS = new InjectionToken<DialogConfig>('DIALOG_DEFAULT_OPTIONS');

export interface DialogConfig {
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
}
