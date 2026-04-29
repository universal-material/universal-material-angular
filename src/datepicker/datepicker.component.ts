import { Component } from '@angular/core';

import { DatepickerBaseComponent } from './datepicker-base.component';

@Component({
  selector: 'u-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {provide: DatepickerBaseComponent, useExisting: DatepickerComponent}
  ],
  standalone: false,
})
export class DatepickerComponent extends DatepickerBaseComponent {

}
