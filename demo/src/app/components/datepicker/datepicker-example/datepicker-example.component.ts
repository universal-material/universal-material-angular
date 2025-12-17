import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UniversalMaterialModule } from '@universal-material/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-datepicker-example',
  templateUrl: './datepicker-example.component.html',
  styleUrls: ['./datepicker-example.component.scss'],
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    UniversalMaterialModule
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DatepickerExampleComponent {
  date!: Date;
  readonly minDate: Date;
  readonly maxDate: Date;

  constructor(private readonly datePipe: DatePipe) {
    const currentDate = new Date();
    this.minDate = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() - 1);
    this.maxDate = new Date(currentDate.getUTCFullYear() + 1, currentDate.getUTCMonth() + 1, currentDate.getUTCDate());
  }

  inputFormatter = (date: Date) => this.datePipe.transform(date, 'shortDate');
}
