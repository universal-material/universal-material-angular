import { Component, ElementRef } from '@angular/core';

import { DatepickerState } from '../datepicker-state.model';
import { DatepickerBaseComponent } from '../datepicker-base.component';

@Component({
  selector: 'u-datepicker-content',
  templateUrl: './datepicker-content.component.html',
  styleUrls: ['./datepicker-content.component.scss']
})
export class DatepickerContentComponent {
  DatepickerState = DatepickerState;
  pickerState = DatepickerState.SelectDay;

  constructor(elementRef: ElementRef,
              readonly datepicker: DatepickerBaseComponent) {
    elementRef.nativeElement.classList.add('u-datepicker');
  }

  private _datesAreEqual(dateA: Date, dateB: Date) {
    return dateA.getUTCMonth() === dateB.getUTCMonth()
      && dateA.getUTCFullYear() === dateB.getUTCFullYear()
      && dateA.getDate() === dateB.getDate();
  }

  isEqualToSelectedDate(date: Date) {
    return this.datepicker.date && this._datesAreEqual(this.datepicker.date, date);
  }

  isEqualToTodayDate(date: Date) {
    return this._datesAreEqual(new Date(), date);
  }
}
