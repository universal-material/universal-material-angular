import { InjectionToken } from '@angular/core';

export const DATEPICKER_DEFAULT_OPTIONS = new InjectionToken('DATEPICKER_DEFAULT_OPTIONS');

export const DefaultDatepickerConfig: DatepickerConfig = {
  clearLabel: 'Clear'
}

export interface DatepickerConfig {
  firstDayOfWeek?: number;
  clearLabel?: string;
  hideClear?: boolean;
}
