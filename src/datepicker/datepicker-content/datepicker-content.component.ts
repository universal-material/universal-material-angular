import { Component, ElementRef, Input } from '@angular/core';

import { DatepickerState } from '../datepicker-state.model';
import { DatepickerBaseComponent } from '../datepicker-base.component';
import { Month } from '../month.model';

@Component({
  selector: 'u-datepicker-content',
  templateUrl: './datepicker-content.component.html',
  styleUrls: ['./datepicker-content.component.scss']
})
export class DatepickerContentComponent {
  DatepickerState = DatepickerState;
  pickerState = DatepickerState.SelectDay;
  @Input() disabled = false;

  constructor(elementRef: ElementRef,
              readonly datepicker: DatepickerBaseComponent) {
    elementRef.nativeElement.classList.add('u-datepicker');
  }

  private _datesAreEqual(dateA: Date, dateB: Date) {
    return dateA.getUTCMonth() === dateB.getUTCMonth()
      && dateA.getUTCFullYear() === dateB.getUTCFullYear()
      && dateA.getDate() === dateB.getDate();
  }

  setYear(year: number) {
    this.datepicker.setYear(year);
    this.pickerState = DatepickerState.SelectMonth;
  }

  setMonth(month: Month) {
    this.datepicker.setMonth(month);
    this.pickerState = DatepickerState.SelectDay;
  }
}
