import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-datepicker-example',
  templateUrl: './datepicker-example.component.html',
  styleUrls: ['./datepicker-example.component.scss'],
  providers: [DatePipe]
})
export class DatepickerExampleComponent {
  date: Date;
  readonly minDate: Date;
  readonly maxDate: Date;

  constructor(private readonly datePipe: DatePipe) {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() - 1);
    this.maxDate = new Date(currentDate.getUTCFullYear() + 1, currentDate.getUTCMonth() + 1, currentDate.getUTCDate());
  }

  inputFormatter = (date: Date) => this.datePipe.transform(date, 'shortDate');

}
