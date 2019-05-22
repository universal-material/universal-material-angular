import { Component, EventEmitter, Inject, Input, LOCALE_ID, OnChanges, Optional, Output, SimpleChanges } from '@angular/core';
import { FormStyle, getLocaleDayNames, getLocaleFirstDayOfWeek, TranslationWidth, WeekDay } from '@angular/common';

import { DatepickerState } from './datepicker-state.model';
import { Week } from './week.model';
import { DayOfWeek } from './day-of-week.model';
import { DATEPICKER_DEFAULT_OPTIONS, DatepickerConfig, DefaultDatepickerConfig } from './datepicker-config.model';

@Component({
  selector: 'u-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnChanges {

  private readonly _totalDaysOfWeek = 7;
  private readonly _yearsGroupsCount = 6;
  private readonly _yearsPerGroup = 4;

  readonly _config: DatepickerConfig;

  readonly weekDayNames: string[];
  readonly totalVisibleYears = this._yearsGroupsCount * this._yearsPerGroup;

  private readonly monthsPerGroup = 4;

  weeks: Week[] = [];
  currentMonth: Date;
  yearGroups: number[][] = [];
  monthGroups: Date[][] = [];
  baseYear: number;

  DatepickerState = DatepickerState;
  pickerState = DatepickerState.SelectDay;

  @Input() date;
  @Output() dateChange = new EventEmitter();

  constructor(@Inject(LOCALE_ID) private readonly _locale: string,
              @Optional() @Inject(DATEPICKER_DEFAULT_OPTIONS) defaultConfig: DatepickerConfig) {
    this._config = {
      ...DefaultDatepickerConfig,
      firstDayOfWeek: getLocaleFirstDayOfWeek(_locale),
      ...defaultConfig
    };

    this.weekDayNames = this.getOrderedWeekDayNames();

    this.setDate(null);
    this.setYearGroups(this.currentMonth.getUTCFullYear() - 2);
    this.setMonthGroups();
  }

  getOrderedWeekDayNames(): string[] {
    const orderedDayNames = [];
    const dayNames = getLocaleDayNames(this._locale, FormStyle.Standalone, TranslationWidth.Narrow);
    let currentDay = this._config.firstDayOfWeek;

    do {
      orderedDayNames.push(dayNames[currentDay]);

      currentDay = this.getNextWeekDay(currentDay);
    }
    while (currentDay !== this._config.firstDayOfWeek);

    return orderedDayNames;
  }

  getNextWeekDay(weekDay: WeekDay) {
    return weekDay === WeekDay.Saturday
      ? WeekDay.Sunday
      : ++weekDay;
  }

  setYearGroups(baseYear: number) {
    this.baseYear = baseYear;
    this.yearGroups.length = 0;

    for (let g = 0; g < this._yearsGroupsCount; g++) {
      const yearGroup = [];

      this.yearGroups.push(yearGroup);
      for (let y = 0; y < this._yearsPerGroup; y++) {
        yearGroup.push(baseYear);
        baseYear++;
      }
    }
  }

  private setMonthGroups() {
    let m = 0;

    while (m < 12) {
      const monthGroup = [];
      this.monthGroups.push(monthGroup);

      for (let i = 0; i < this.monthsPerGroup; i++) {
        monthGroup.push(new Date(this.baseYear, m));
        m++;
      }
    }
  }

  setYear(year: number) {
    this.setCurrentMonth(new Date(year, this.currentMonth.getUTCMonth()));
    this.pickerState = DatepickerState.SelectMonth;
  }

  setMonth(month: Date) {
    this.setCurrentMonth(new Date(this.currentMonth.getUTCFullYear(), month.getUTCMonth()));
    this.pickerState = DatepickerState.SelectDay;
  }

  private setDate(date: Date) {
    this.date = date;

    date = date || new Date();
    this.setCurrentMonth(new Date(date.getUTCFullYear(), date.getUTCMonth()));
  }

  private addToCurrentMonth(value: number) {
    this.setCurrentMonth(new Date(this.currentMonth.getUTCFullYear(), this.currentMonth.getUTCMonth() + value));
  }

  private _getCurrentMonthInitialDate(): Date {
    return new Date(this.currentMonth.getUTCFullYear(), this.currentMonth.getUTCMonth());
  }

  private _getInitialDateForCurrentMonth(): Date {
    const currentMonthInitialDate = this._getCurrentMonthInitialDate();

    if (currentMonthInitialDate.getDay() === this._config.firstDayOfWeek) {
      return currentMonthInitialDate;
    }

    if (currentMonthInitialDate.getDay() > this._config.firstDayOfWeek) {
      currentMonthInitialDate
        .setDate(currentMonthInitialDate.getDate() - (currentMonthInitialDate.getDay() - this._config.firstDayOfWeek));
    } else {
      currentMonthInitialDate
        .setDate(currentMonthInitialDate.getDate() - (WeekDay.Saturday - (this._config.firstDayOfWeek - currentMonthInitialDate.getDay() - 1)));
    }

    return currentMonthInitialDate;
  }

  private setCurrentMonth(date: Date) {
    this.currentMonth = date;
    this.weeks.length = 0;
    const processDate = new Date(this._getInitialDateForCurrentMonth());

    do {
      const currentWeek: Week = {
        baseDate: new Date(processDate),
        days: []
      };

      this.weeks.push(currentWeek);

      for (let i = 0; i < this._totalDaysOfWeek; i++) {
        currentWeek.days.push({date: new Date(processDate), outsideMonth: processDate.getMonth() !== this.currentMonth.getMonth()});

        processDate.setDate(processDate.getDate() + 1);
      }
    } while (processDate.getUTCMonth() === this.currentMonth.getUTCMonth());
  }

  showNextMonth() {
    this.addToCurrentMonth(1);
  }

  showPreviousMonth() {
    this.addToCurrentMonth(-1);
  }

  selectDate(date: Date) {
    this.setDate(date);
    this.dateChange.emit(date);
  }

  datesAreEqual(dateA: Date, dateB: Date) {
    return dateA.getUTCMonth() === dateB.getUTCMonth()
      && dateA.getUTCFullYear() === dateB.getUTCFullYear()
      && dateA.getDate() === dateB.getDate();
  }

  isEqualToSelectedDate(date: Date) {
    return this.date && this.datesAreEqual(this.date, date);
  }

  isEqualToTodayDate(date: Date) {
    return this.datesAreEqual(new Date(), date);
  }

  trackByWeek(index: number, week: Week) {
    return week.baseDate.getTime();
  }

  trackByDay(index: number, day: DayOfWeek) {
    return day.date.getTime();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.date && changes.date.currentValue && changes.date.currentValue !== changes.date.previousValue) {
      this.setDate(changes.date.currentValue);
    }
  }
}
