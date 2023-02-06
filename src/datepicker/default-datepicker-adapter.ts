import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DatePipe, FormStyle, getLocaleDayNames, TranslationWidth, WeekDay } from '@angular/common';

import { DatepickerAdapter } from './datepicker-adapter';

@Injectable({
  providedIn: 'root'
})
export class DefaultDatepickerAdapter extends DatepickerAdapter {
  constructor(@Inject(LOCALE_ID) private readonly _locale: string,
              private readonly datePipe: DatePipe) {
    super();
  }

  formatDate(date: Date | null): string {
    // @ts-ignore
    return this.datePipe.transform(date, 'mediumDate', null, this._locale);
  }

  getMonthName(date: Date | null): string {
    // @ts-ignore
    return this.datePipe.transform(date, 'MMM', null, this._locale);
  }

  getMonthWithYear(date: Date | null): string {
    // @ts-ignore
    return this.datePipe.transform(date, 'MMM yyyy', null, this._locale);
  }

  getYear(date: Date | null): string {
    // @ts-ignore
    return this.datePipe.transform(date, 'yyyy', null, this._locale);
  }

  getWeekDaysNames(firstDayOfWeek: number): string[] {
    const orderedDayNames = [];
    const dayNames = getLocaleDayNames(this._locale, FormStyle.Standalone, TranslationWidth.Narrow);
    let currentDay: number = firstDayOfWeek!;

    do {
      orderedDayNames.push(dayNames[currentDay]);

      currentDay = this._getNextWeekDay(currentDay);
    }
    while (currentDay !== firstDayOfWeek);

    return orderedDayNames;
  }

  private _getNextWeekDay(weekDay: WeekDay) {
    return weekDay === WeekDay.Saturday
      ? WeekDay.Sunday
      : ++weekDay;
  }
}
