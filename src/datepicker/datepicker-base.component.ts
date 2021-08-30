import {
  Directive,
  EventEmitter,
  Inject,
  Input,
  LOCALE_ID,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { getLocaleFirstDayOfWeek, WeekDay } from '@angular/common';

import { Week } from './week.model';
import { DayOfWeek } from './day-of-week.model';
import { DATEPICKER_DEFAULT_OPTIONS, DatepickerConfig, DefaultDatepickerConfig } from './datepicker-config.model';
import { DatepickerAdapter } from './datepicker-adapter';
import { DefaultDatepickerAdapter } from './default-datepicker-adapter';
import { Month } from './month.model';
import { Year } from './year.model';

@Directive()
export abstract class DatepickerBaseComponent {
  private readonly _totalDaysOfWeek = 7;
  private readonly _yearsGroupsCount = 6;
  private readonly _yearsPerGroup = 4;

  readonly weekDayNames: string[];
  readonly totalVisibleYears = this._yearsGroupsCount * this._yearsPerGroup;

  private readonly monthsPerGroup = 4;

  private _minYear: number;
  private _minMonth: number;
  private _maxYear: number;
  private _maxMonth: number;

  weeks: Week[] = [];
  currentMonth: Month;
  yearGroups: Year[][] = [];
  monthGroups: Month[][] = [];
  baseYear: number;
  firstDayOfWeek: number;

  @Input() dayTemplate: TemplateRef<DayOfWeek>;
  @Input() datepickerTitle: string = 'Select date';
  @Input() navigateBackClass: string = 'u-chevron-left';
  @Input() navigateForwardClass: string = 'u-chevron-right';
  @Input() hideHeader: boolean = false;
  @Input() hideClear: boolean = false;
  @Input() clearLabel: string;

  @Output() currentMonthChange = new EventEmitter<Month>();

  _min: Date;
  _max: Date;

  @Input()
  get min(): Date {
    return this._min;
  }
  set min(value: Date) {
    this._min = value;
    this._minYear = value && value.getUTCFullYear();
    this._minMonth = value && value.getUTCMonth();
    this._setYearsDisabled();
    this._setMonthsDisabled();
    this._setDaysDisabled();
  }

  @Input()
  get max(): Date {
    return this._max;
  }
  set max(value: Date) {
    this._max = value;
    this._maxYear = value && value.getUTCFullYear();
    this._maxMonth = value && value.getUTCMonth();
    this._setYearsDisabled();
    this._setMonthsDisabled();
    this._setDaysDisabled();
  }

  @Input() date: Date | null;
  @Output() dateChange = new EventEmitter();
  formattedDate: string;

  constructor(@Inject(LOCALE_ID) private readonly _locale: string,
              @Optional() @Inject(DATEPICKER_DEFAULT_OPTIONS) private readonly _defaultConfig: DatepickerConfig,
              @Optional() @Inject(DatepickerAdapter) private readonly datepickerAdapter: DatepickerAdapter,
              defaultDatepickerAdapter: DefaultDatepickerAdapter) {
    this._setInnerConfig();
    this.datepickerAdapter = this.datepickerAdapter || defaultDatepickerAdapter;

    this.weekDayNames = this.datepickerAdapter.getWeekDaysNames(this.firstDayOfWeek);

    this._setDate(null);
    this.setYearGroups(this.currentMonth.utcYear - 2);
    this._setMonthGroups();
  }

  setYearGroups(baseYear: number) {
    this.baseYear = baseYear;
    this.yearGroups.length = 0;

    for (let g = 0; g < this._yearsGroupsCount; g++) {
      const yearGroup: Year[] = [];

      this.yearGroups.push(yearGroup);
      for (let y = 0; y < this._yearsPerGroup; y++) {
        yearGroup.push({
          year: baseYear,
          disabled: this._isYearDisabled(baseYear)
        });
        baseYear++;
      }
    }
  }

  private _setInnerConfig() {
    const config = {
      ...DefaultDatepickerConfig,
      firstDayOfWeek: getLocaleFirstDayOfWeek(this._locale),
      ...this._defaultConfig
    };

    this.clearLabel = config.clearLabel;
    this.hideClear = config.hideClear;
    this.firstDayOfWeek = config.firstDayOfWeek;
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
    const month = {
      date: date,
      utcYear: date.getUTCFullYear(),
      utcMonth: date.getUTCMonth(),
      name: this.datepickerAdapter.getMonthName(date),
      nameWithYear: this.datepickerAdapter.getMonthWithYear(date),
      formattedYear: this.datepickerAdapter.getYear(date),
      disabled: false
    };

    month.disabled = this._isMonthDisabled(month);

    return month;
  }

  private _addToCurrentMonth(value: number) {
    this._setCurrentMonth(new Date(this.currentMonth.utcYear, this.currentMonth.utcMonth + value));
  }

  private _getCurrentMonthInitialDate(): Date {
    return new Date(this.currentMonth.utcYear, this.currentMonth.utcMonth);
  }

  private _getInitialDateForCurrentMonth(): Date {
    const currentMonthInitialDate = this._getCurrentMonthInitialDate();

    if (currentMonthInitialDate.getDay() === this.firstDayOfWeek) {
      return currentMonthInitialDate;
    }

    if (currentMonthInitialDate.getDay() > this.firstDayOfWeek!) {
      currentMonthInitialDate
        .setDate(currentMonthInitialDate.getDate() - (currentMonthInitialDate.getDay() - this.firstDayOfWeek!));
    } else {
      currentMonthInitialDate
        .setDate(currentMonthInitialDate.getDate() - (WeekDay.Saturday - (this.firstDayOfWeek! - currentMonthInitialDate.getDay() - 1)));
    }

    return currentMonthInitialDate;
  }

  private _setCurrentMonth(date: Date) {
    const previousMonth = this.currentMonth;
    const newMonth = this.getMonth(date);

    if (previousMonth && previousMonth.date.getTime() === newMonth.date.getTime()) {
      return;
    }

    this.currentMonth = newMonth;
    this.currentMonthChange.emit(this.currentMonth);

    this.weeks.length = 0;
    const processDate = new Date(this._getInitialDateForCurrentMonth());

    do {
      const currentWeek: Week = {
        baseDate: new Date(processDate),
        days: []
      };

      this.weeks.push(currentWeek);

      for (let i = 0; i < this._totalDaysOfWeek; i++) {
        const dayDate = new Date(processDate);
        currentWeek.days.push({
          date: dayDate,
          outsideMonth: processDate.getMonth() !== this.currentMonth.utcMonth,
          disabled: this._isDayDisabled(dayDate)
        });

        processDate.setDate(processDate.getDate() + 1);
      }
    } while (processDate.getUTCMonth() === this.currentMonth.utcMonth);

    this._setMonthsDisabled();
  }

  showNextMonth() {
    this._addToCurrentMonth(1);
  }

  showPreviousMonth() {
    this._addToCurrentMonth(-1);
  }

  private _isDayDisabled(date: Date): boolean {
    return date < this.min || date > this.max;
  }

  private _setDaysDisabled(): void {
    for (const week of this.weeks) {
      for (const day of week.days) {
        day.disabled = this._isDayDisabled(day.date);
      }
    }
  }

  private _isMonthDisabled(month: Month): boolean {
    return this.currentMonth
      && (this._isYearDisabled(this.currentMonth.utcYear)
        || (this.currentMonth.utcYear === this._minYear && month.utcMonth < this._minMonth)
        || (this.currentMonth.utcYear === this._maxYear && month.utcMonth > this._maxMonth));
  }

  private _setMonthsDisabled(): void {
    for (const monthGroup of this.monthGroups) {
      for (const month of monthGroup) {
        month.disabled = this._isMonthDisabled(month);
      }
    }
  }

  private _isYearDisabled(year: number): boolean {
    return year < this._minYear || year > this._maxYear;
  }

  private _setYearsDisabled(): void {
    for (const yearGroup of this.yearGroups) {
      for (const year of yearGroup) {
        year.disabled = this._isYearDisabled(year.year);
      }
    }
  }

  selectDate(date: Date): void {
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
  }
}
