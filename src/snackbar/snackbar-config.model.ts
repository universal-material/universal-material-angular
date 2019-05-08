import { InjectionToken } from '@angular/core';

export const SNACKBAR_DEFAULT_OPTIONS = new InjectionToken('SNACKBAR_DEFAULT_OPTIONS');

export interface SnackbarConfig {
  duration?: number;
  dismissOnAction?: boolean;
  dismissWhenOpenAnotherSnackbar?: boolean;
}
