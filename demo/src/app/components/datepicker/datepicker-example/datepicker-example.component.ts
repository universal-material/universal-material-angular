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

  constructor(private readonly datePipe: DatePipe) {
  }

  inputFormatter = (date: Date) => this.datePipe.transform(date, 'shortDate');
}
