import { InjectionToken } from '@angular/core';

export const DIALOG_DEFAULT_OPTIONS = new InjectionToken('DIALOG_DEFAULT_OPTIONS');

export class DialogConfig {
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
}
