import {
  Component, Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  OnChanges,
  Optional,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormStyle, getLocaleDayNames, getLocaleFirstDayOfWeek, TranslationWidth, WeekDay } from '@angular/common';

import { DatepickerState } from './datepicker-state.model';
import { Week } from './week.model';
import { DayOfWeek } from './day-of-week.model';
import { DATEPICKER_DEFAULT_OPTIONS, DatepickerConfig, DefaultDatepickerConfig } from './datepicker-config.model';

@Directive()
export abstract class DatepickerBaseComponent {
  private readonly _totalDaysOfWeek = 7;
  private readonly _yearsGroupsCount = 6;
  private readonly _yearsPerGroup = 4;

  _innerConfig: DatepickerConfig;

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

  @Input() config: DatepickerConfig;
  @Input() date: Date | null;
  @Output() dateChange = new EventEmitter();

  constructor(@Inject(LOCALE_ID) private readonly _locale: string,
              @Optional() @Inject(DATEPICKER_DEFAULT_OPTIONS) private readonly _defaultConfig: DatepickerConfig) {
    this._setInnerConfig();

    this.weekDayNames = this._getOrderedWeekDayNames();

    this._setDate(null);
    this.setYearGroups(this.currentMonth.getUTCFullYear() - 2);
    this._setMonthGroups();
  }

  private _getOrderedWeekDayNames(): string[] {
    const orderedDayNames = [];
    const dayNames = getLocaleDayNames(this._locale, FormStyle.Standalone, TranslationWidth.Narrow);
    let currentDay: number = this._innerConfig.firstDayOfWeek!;

    do {
      orderedDayNames.push(dayNames[currentDay]);

      currentDay = this._getNextWeekDay(currentDay);
    }
    while (currentDay !== this._innerConfig.firstDayOfWeek);

    return orderedDayNames;
  }

  private _getNextWeekDay(weekDay: WeekDay) {
    return weekDay === WeekDay.Saturday
      ? WeekDay.Sunday
      : ++weekDay;
  }

  setYearGroups(baseYear: number) {
    this.baseYear = baseYear;
    this.yearGroups.length = 0;

    for (let g = 0; g < this._yearsGroupsCount; g++) {
      const yearGroup: number[] = [];

      this.yearGroups.push(yearGroup);
      for (let y = 0; y < this._yearsPerGroup; y++) {
        yearGroup.push(baseYear);
        baseYear++;
      }
    }
  }

  private _setInnerConfig() {
    this._innerConfig = {
      ...DefaultDatepickerConfig,
      firstDayOfWeek: getLocaleFirstDayOfWeek(this._locale),
      ...this._defaultConfig,
      ...this.config
    };
  }

  private _setMonthGroups() {
    let m = 0;

    while (m < 12) {
      const monthGroup: Date[] = [];
      this.monthGroups.push(monthGroup);

      for (let i = 0; i < this.monthsPerGroup; i++) {
        monthGroup.push(new Date(this.baseYear, m));
        m++;
      }
    }
  }

  setYear(year: number) {
    this._setCurrentMonth(new Date(year, this.currentMonth.getUTCMonth()));
    this.pickerState = DatepickerState.SelectMonth;
  }

  setMonth(month: Date) {
    this._setCurrentMonth(new Date(this.currentMonth.getUTCFullYear(), month.getUTCMonth()));
    this.pickerState = DatepickerState.SelectDay;
  }

  protected _setDate(date: Date | null) {
    this.date = date;

    date = date || new Date();
    this._setCurrentMonth(new Date(date.getUTCFullYear(), date.getUTCMonth()));
  }

  private _addToCurrentMonth(value: number) {
    this._setCurrentMonth(new Date(this.currentMonth.getUTCFullYear(), this.currentMonth.getUTCMonth() + value));
  }

  private _getCurrentMonthInitialDate(): Date {
    return new Date(this.currentMonth.getUTCFullYear(), this.currentMonth.getUTCMonth());
  }

  private _getInitialDateForCurrentMonth(): Date {
    const currentMonthInitialDate = this._getCurrentMonthInitialDate();

    if (currentMonthInitialDate.getDay() === this._innerConfig.firstDayOfWeek) {
      return currentMonthInitialDate;
    }

    if (currentMonthInitialDate.getDay() > this._innerConfig.firstDayOfWeek!) {
      currentMonthInitialDate
        .setDate(currentMonthInitialDate.getDate() - (currentMonthInitialDate.getDay() - this._innerConfig.firstDayOfWeek!));
    } else {
      currentMonthInitialDate
        .setDate(currentMonthInitialDate.getDate() - (WeekDay.Saturday - (this._innerConfig.firstDayOfWeek! - currentMonthInitialDate.getDay() - 1)));
    }

    return currentMonthInitialDate;
  }

  private _setCurrentMonth(date: Date) {
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
    this._addToCurrentMonth(1);
  }

  showPreviousMonth() {
    this._addToCurrentMonth(-1);
  }

  selectDate(date: Date) {
    this._setDate(date);
    this.dateChange.emit(date);
  }

  private _datesAreEqual(dateA: Date, dateB: Date) {
    return dateA.getUTCMonth() === dateB.getUTCMonth()
      && dateA.getUTCFullYear() === dateB.getUTCFullYear()
      && dateA.getDate() === dateB.getDate();
  }

  isEqualToSelectedDate(date: Date) {
    return this.date && this._datesAreEqual(this.date, date);
  }

  isEqualToTodayDate(date: Date) {
    return this._datesAreEqual(new Date(), date);
  }

  trackByWeek(index: number, week: Week) {
    return week.baseDate.getTime();
  }

  trackByDay(index: number, day: DayOfWeek) {
    return day.date.getTime();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.date && changes.date.currentValue && changes.date.currentValue !== changes.date.previousValue) {
      this._setDate(changes.date.currentValue);
    }

    if (changes.config) {
      this._innerConfig = {...DefaultDatepickerConfig, ...this._defaultConfig, ...this.config};
    }
  }
}
