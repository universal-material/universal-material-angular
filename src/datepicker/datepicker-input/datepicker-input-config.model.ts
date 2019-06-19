import { InjectionToken } from '@angular/core';
import { DatepickerConfig } from '../datepicker-config.model';

export const DATEPICKER_INPUT_DEFAULT_OPTIONS = new InjectionToken('DATEPICKER_INPUT_DEFAULT_OPTIONS');

export const DefaultDatepickerInputConfig = {
  format: 'mediumDate'
}

export interface DatepickerInputConfig {
  format?: string;
  datepickerConfig?: DatepickerConfig;
}
