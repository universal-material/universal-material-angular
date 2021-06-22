import { Directive, EventEmitter, Inject, Input, LOCALE_ID, Optional, Output, SimpleChanges } from '@angular/core';
import { getLocaleFirstDayOfWeek, WeekDay } from '@angular/common';

import { Week } from './week.model';
import { DayOfWeek } from './day-of-week.model';
import { DATEPICKER_DEFAULT_OPTIONS, DatepickerConfig, DefaultDatepickerConfig } from './datepicker-config.model';
import { DatepickerAdapter } from './datepicker-adapter';
import { DefaultDatepickerAdapter } from './default-datepicker-adapter';
import { Month } from './month.model';

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
  currentMonth: Month;
  yearGroups: number[][] = [];
  monthGroups: Month[][] = [];
  baseYear: number;

  @Input() config: DatepickerConfig;
  @Input() datepickerTitle: string = 'Select date';
  @Input() navigateBackClass: string = 'u-chevron-left';
  @Input() navigateForwardClass: string = 'u-chevron-right';
  @Input() date: Date | null;
  @Output() dateChange = new EventEmitter();
  formattedDate: string;

  constructor(@Inject(LOCALE_ID) private readonly _locale: string,
              @Optional() @Inject(DATEPICKER_DEFAULT_OPTIONS) private readonly _defaultConfig: DatepickerConfig,
              @Optional() @Inject(DatepickerAdapter) private readonly datepickerAdapter: DatepickerAdapter,
              defaultDatepickerAdapter: DefaultDatepickerAdapter) {
    this._setInnerConfig();
    this.datepickerAdapter = this.datepickerAdapter || defaultDatepickerAdapter;

    this.weekDayNames = this.datepickerAdapter.getWeekDaysNames(this._innerConfig.firstDayOfWeek);

    this._setDate(null);
    this.setYearGroups(this.currentMonth.utcYear - 2);
    this._setMonthGroups();
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
      const monthGroup: Month[] = [];
      this.monthGroups.push(monthGroup);

      for (let i = 0; i < this.monthsPerGroup; i++) {
        monthGroup.push(this.getMonth(new Date(this.baseYear, m)));
        m++;
      }
    }
  }

  setYear(year: number) {
    this._setCurrentMonth(new Date(year, this.currentMonth.utcMonth));
  }

  setMonth(month: Month) {
    this._setCurrentMonth(new Date(this.currentMonth.utcYear, month.utcMonth));
  }

  protected _setDate(date: Date | null) {
    this.date = date;
    this.formattedDate = this.datepickerAdapter.formatDate(date);

    date = date || new Date();
    this._setCurrentMonth(new Date(date.getUTCFullYear(), date.getUTCMonth()));
  }

  private getMonth(date: Date): Month {
    return {
      date: date,
      utcYear: date.getUTCFullYear(),
      utcMonth: date.getUTCMonth(),
      name: this.datepickerAdapter.getMonthName(date),
      nameWithYear: this.datepickerAdapter.getMonthWithYear(date),
      formattedYear: this.datepickerAdapter.getYear(date),
    };
  }

  private _addToCurrentMonth(value: number) {
    this._setCurrentMonth(new Date(this.currentMonth.utcYear, this.currentMonth.utcMonth + value));
  }

  private _getCurrentMonthInitialDate(): Date {
    return new Date(this.currentMonth.utcYear, this.currentMonth.utcMonth);
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
    this.currentMonth = this.getMonth(date);

    this.weeks.length = 0;
    const processDate = new Date(this._getInitialDateForCurrentMonth());

    do {
      const currentWeek: Week = {
        baseDate: new Date(processDate),
        days: []
      };

      this.weeks.push(currentWeek);

      for (let i = 0; i < this._totalDaysOfWeek; i++) {
        currentWeek.days.push({date: new Date(processDate), outsideMonth: processDate.getMonth() !== this.currentMonth.utcMonth});

        processDate.setDate(processDate.getDate() + 1);
      }
    } while (processDate.getUTCMonth() === this.currentMonth.utcMonth);
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
