import { Component } from '@angular/core';

import { DatepickerBaseComponent } from './datepicker-base.component';

@Component({
  selector: 'u-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [
    {provide: DatepickerBaseComponent, useExisting: DatepickerComponent}
  ]
})
export class DatepickerComponent extends DatepickerBaseComponent {

}
