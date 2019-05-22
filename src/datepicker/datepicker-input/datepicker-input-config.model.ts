import { InjectionToken } from '@angular/core';

export const DATEPICKER_INPUT_DEFAULT_OPTIONS = new InjectionToken('DATEPICKER_INPUT_DEFAULT_OPTIONS');

export const DefaultDatepickerInputConfig = {
  format: 'mediumDate'
}

export interface DatepickerInputConfig {
  format?: string;
}
